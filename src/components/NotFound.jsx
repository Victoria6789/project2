import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NotFound = ({ isAuthenticated }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div
        className="prose flex flex-col gap-5 p-6 bg-white rounded-lg shadow-md"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <h1 className="text-4xl font-bold text-center">404</h1>
        <p className="mt-4 text-lg text-center">Page not found</p>
        {isAuthenticated ? (
          <Link
            to="/home"
            className="mt-4 text-blue-600 hover:underline text-center"
          >
            Go HOME
          </Link>
        ) : (
          <Link
            to="/register"
            className="mt-4 text-blue-600 hover:underline text-center"
          >
            Go LOG IN
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(NotFound);