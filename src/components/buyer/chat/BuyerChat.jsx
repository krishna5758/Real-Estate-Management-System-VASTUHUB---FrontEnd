import { useEffect, useState } from "react";
import "./BuyerChat.css";
import Button from 'react-bootstrap/Button';

function BuyerChat() {
    const [agents, setAgents] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await fetch(`http://localhost:8088/api/auth/getAgents`);
                const data = await response.json();

                if (Array.isArray(data.agentsList)) {
                    setAgents(data.agentsList);
                } else {
                    console.error('Expected agentsList to be an array:', data.agentsList);
                }

            } catch (err) {
                setError('Error fetching agents:', err);
            }
        };
        fetchAgents();
    }, []);

    const sendMailToAgent = async (userId) => {

        try {
            const response = await fetch(`http://localhost:8088/api/properties/sendBuyPropertyDetails?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            if (response.status === 409) {
                alert(data.message);
            }
            else if (response.ok) {
                // If the response is successful, you can update the UI
                // setPropertyData(prevList =>
                //     prevList.filter(property => property.id !== id)  // Remove the approved property from the list
                // );
                alert(data.message);
            } else {
                alert(data.message);
            }
        }
        catch (err) {
            alert('Error approving the property');
        }


    };

    return (
        <div className="buyer-chat-card">
            <h1 className="buyer-chat-h1">Chat Agent</h1>
            <div className="buyer-chat-list">
                {agents.map((agent, index) => (

                    <div className="buyer-chat-li" key={index}>
                        <p className="buyer-chat-p"><strong>Agent Name:</strong> {agent.username}</p>
                        <p className="buyer-chat-p"><strong>Gender:</strong> {agent.gender}</p>
                        <p className="buyer-chat-p"><strong>Email:</strong> {agent.email}</p>
                        <p className="buyer-chat-p"><strong>Mobile Number:</strong> {agent.mobileNumber}</p>
                        <p className="buyer-chat-p"><strong>Role:</strong> {agent.role}</p>
                        <Button onClick={() => sendMailToAgent(agent.id)}
                         className="btn-buyer-chat-send-request">Send Request</Button>
                    </div>

                ))}

            </div>

        </div>
    );

}

export default BuyerChat;