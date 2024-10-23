import { useEffect, useState } from "react";
import "./ViewAllAgents.css";

function ViewAllAgents() {

    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await fetch('http://localhost:8088/api/auth/getAgents');
                const data = await response.json();

                if (response.ok) {
                    setAgents(data.agentsList);
                } else {
                    setError('Failed to fetch agent data');
                }
            } catch (err) {
                setError('Error fetching agent data');
            } finally {
                setLoading(false);
            }
        };
        fetchAgents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div className="view-all-agent-list">
            <h2>Agent List</h2>
            <div className="view-all-card-container">
                {agents.length > 0 ? (
                    agents.map((agent, index) => (
                        <div key={index} className="view-all-agent-card">
                            <h3>{agent.username}</h3>
                            <p><strong>Gender:</strong> {agent.gender}</p>
                            <p><strong>Email:</strong> {agent.email}</p>
                            <p><strong>Mobile Number:</strong> {agent.mobileNumber}</p>
                            {/* <p><strong>Role:</strong> {agent.role}</p> */}
                        </div>
                    ))
                ) : (
                    <div>No agents found</div>
                )}
            </div>
        </div>
    );

}

export default ViewAllAgents;