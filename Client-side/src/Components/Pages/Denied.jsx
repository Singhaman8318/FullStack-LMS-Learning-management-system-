import React from "react";
import { useNavigate } from "react-router-dom";

function Denied() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-base-200">
      {/* 403 Error */}
      <h1 className="text-9xl font-extrabold text-error drop-shadow-lg">403</h1>

      {/* Access Denied Card */}
      <div className="card w-96 bg-base-100 shadow-xl mt-5">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl">🚫 Access Denied 🚫</h2>
          <p className="text-gray-500">
            You don’t have permission to view this page.
          </p>
          <div className="card-actions mt-4">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-error btn-wide btn-outline animate-bounce"
            >
              🔙 Go Back
            </button>
          </div>
        </div>
      </div>

      {/* Cool Background Animation */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-error to-warning opacity-10 blur-3xl"></div>
    </div>
  );
}

export default Denied;
