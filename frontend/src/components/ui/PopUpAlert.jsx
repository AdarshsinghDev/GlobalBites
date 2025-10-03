import React, { useState } from "react";
import { BadgeCheck, FastForward } from "lucide-react";

const PopUpAlert = (props) => {
  let showAlert = props.alert;
  console.log(props.alert);

  return (
    <>
      {showAlert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-md bg-white/95 backdrop-blur-lg border border-gray-100 shadow-2xl rounded-3xl overflow-hidden transform transition-all duration-300 ease-out">
            {/* Gradient accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"></div>

            {/* Content container */}
            <div className="px-8 py-10 flex flex-col items-center text-center space-y-6">
              {/* Icon with animated background */}
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/10 rounded-full animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-full border border-green-100">
                  <BadgeCheck className="w-16 h-16 text-green-500" />
                </div>
              </div>

              {/* Text content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                  {props.recipeName}
                </h3>
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  {props.message}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={props.onClose}
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white  px-8 py-2 rounded-xl transition-all duration-200 ease-out shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Close</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700 ease-out"></div>
              </button>
            </div>

            {/* Subtle bottom glow */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent blur-sm"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpAlert;
