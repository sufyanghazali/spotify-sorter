const Dashboard = ({ access_token }) => {
  return (
    <div className="dashboard">
      <p>{access_token}</p>
    </div>
  );
};

export default Dashboard;
