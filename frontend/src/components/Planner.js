import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate เพื่อเปลี่ยนเส้นทาง
import axios from 'axios';
import Swal from 'sweetalert2';
import './Planner.css';

const Planner = () => {
    const [plans, setPlans] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate(); // ใช้ navigate

    useEffect(() => {
        const checkLoginStatus = async () => {
            const response = await fetch("http://localhost:5000/api/cookies-check", {
                method: "GET",
                credentials: "include", // ส่งคุกกี้
            });

            if (response.status === 401) {
                navigate("/login"); // หากไม่มีการล็อกอิน, นำผู้ใช้ไปยังหน้า login
            } else {
                const data = await response.json();
                setUserId(data.user_id); // ตั้งค่า user_id
            }
        };

        checkLoginStatus();
    }, [navigate]);

    useEffect(() => {
        if (userId) {
            const fetchPlans = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/planner/user`, {
                        withCredentials: true,
                    });
                    setPlans(response.data);
                } catch (err) {
                    console.error("Error fetching plans:", err.response ? err.response.data : err);
                    setMessage('เกิดข้อผิดพลาดในการดึงข้อมูลแผน');
                }
            };
            fetchPlans();
        }
    }, [userId]);

    const handleAddNewPlan = () => {
        // เมื่อคลิกปุ่ม "+" จะพาไปที่หน้าสร้างแผนใหม่
        navigate('/create-plan'); 
    };

    const handleDelete = async (planId) => {
        Swal.fire({
            title: "ยืนยันการลบแผนการเดินทางนี้หรือไม่?",
            text: "แผนการเดินทางนี้จะถูกลบออกจากระบบ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ลบ",
            cancelButtonText: "ยกเลิก"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete('http://localhost:5000/api/planner/remove', {
                        withCredentials: true,
                        data: { plan_id: planId }
                    });

                    if (response.status === 200) {
                        setPlans(plans.filter(plan => plan.plan_id !== planId));
                        Swal.fire("ลบสำเร็จ!", "แผนการเดินทางถูกลบออกจากระบบแล้ว", "success");
                    }
                } catch (err) {
                    Swal.fire("Error", "ไม่สามารถลบแผนการเดินทางได้", "error");
                }
            }
        });
    };

    const handleSyncToCalendar = async (planId) => {
        try {
            const response = await axios.post("http://localhost:5000/api/google/sync-plan", 
                { plan_id: planId },
                { withCredentials: true }
            );
    
            Swal.fire({
                icon: "success",
                title: "บันทึกลงปฏิทินของคุณสำเร็จแล้ว",
                html: `<a href="${response.data.eventLink}" target="_blank">ไปที่ปฏิทินของคุณ</a>`,
                confirmButtonText: "ตกลง"
            });
        } catch (error) {
            console.error("Error syncing plan:", error.response?.data || error);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: error.response?.data?.error || "ไม่สามารถเชื่อมกับ Google Calendar ได้"
            });
        }
    };

    const handleStartTrip = (planId) => {
        // เมื่อคลิกปุ่มเริ่มต้นการเดินทาง, จะพาไปยังหน้ารายละเอียดของแผนการเดินทาง
        navigate(`/plan-details/${planId}`);
    };

    return (
        <div className="planner-page">
            <div className="planner-container">
                {/* <h2>Your Travel Plans</h2>
                {message && <p className="message">{message}</p>} */}
                <div className="planner-header">
                    <h2>Your Travel Plans</h2>
                    {message && <p className="message">{message}</p>}
                        <div className="add-Plan">
                            <div className="add-plan-button" onClick={handleAddNewPlan}>สร้างแผนการเดินทาง</div>
                            <div className="add-plan-button" onClick={() => navigate('/deleted-plans')}>ดูประวัติแผนการเดินทาง</div>
                        </div> 
                </div>


                {/* ปุ่ม "+" สำหรับไปหน้าใหม่ */}
                {/* <div className="add-plan-button" onClick={handleAddNewPlan}>+</div> เพิ่มการเรียกใช้ navigate */}

                <div className="plans-list">
                    {plans.map((plan) => (
                        <div key={plan.plan_id} className="plan-card">
                            <div className="plan-header">
                                <span className="plan-title">{plan.title}</span>
                                <button 
                                className="start-trip-button" 
                                onClick={() => handleStartTrip(plan.plan_id)} // เพิ่มการคลิกเพื่อไปหน้า PlanDetails
                            >
                                เริ่มต้นการเดินทาง
                            </button>
                            </div>
                            <p className="plan-info">เริ่มเดินทาง: {new Date(plan.created_at).toLocaleDateString()}</p>
                            <div className="plan-actions">
                                <span className="action-button" onClick={() => handleDelete(plan.plan_id)}>
                                    <i className="fas fa-trash"></i> ลบแผนการเดินทาง
                                </span>
                                <span className="action-button">
                                    <i className="fas fa-link"></i> แชร์การเดินทาง
                                </span>
                                <span className="action-button" onClick={() => handleSyncToCalendar(plan.plan_id)}>
                                    <i className="fas fa-calendar-check"></i> Sync ไป Google Calendar
                                </span>

                                {plan.google_event_link && (
                                    <a
                                        className="action-button"
                                        href={plan.google_event_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fas fa-external-link-alt"></i> ไปที่ปฏิทินของคุณ
                                    </a>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Planner;
