import axios from "axios";
import { useEffect, useState } from "react";
import "./HireAgent.css";
import Button from 'react-bootstrap/Button';

function HireAgent() {
    const [agents, setAgents] = useState([]);

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
            const response = await fetch(`http://localhost:8088/api/properties/hireAgent?userId=${userId}`, {
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
        <div className="agent-card">
            <h1 className="agent-h1">Hire Agent</h1>
            <div className="agents-list">
                {agents.map((agent, index) => (

                    <div className="agent-li" key={index}>
                        <p className="agent-p"><strong>Agent Name:</strong> {agent.username}</p>
                        <p className="agent-p"><strong>Gender:</strong> {agent.gender}</p>
                        <p className="agent-p"><strong>Email:</strong> {agent.email}</p>
                        <p className="agent-p"><strong>Mobile Number:</strong> {agent.mobileNumber}</p>
                        <p className="agent-p"><strong>Role:</strong> {agent.role}</p>
                        <Button onClick={() => sendMailToAgent(agent.id)}
                         className="btn-agent-send-request">Send Request</Button>
                    </div>

                ))}

            </div>

        </div>
    );

}

export default HireAgent;