import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFeature, clearActiveFeature } from '../features/whyChooseUs/whyChooseUsSlice';
import { FEATURES_DATA } from '../features/whyChooseUs/whyChooseUsSlice';

const FeatureCard = ({ feature, isActive, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 h-full flex flex-col ${
        isActive
          ? 'bg-gradient-to-br from-[#3F5EFB]/20 to-[#FC466B]/20 border-[#3F5EFB] shadow-lg shadow-[#3F5EFB]/30'
          : 'bg-gradient-to-br from-[#110D2E]/50 to-[#1a0f3e]/50 border-[#3F5EFB]/20 hover:border-[#3F5EFB]/60 hover:shadow-lg hover:shadow-[#3F5EFB]/10'
      }`}
    >
      <div className="mb-4 flex items-start">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
            isActive
              ? 'bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] text-white'
              : 'bg-[#3F5EFB]/20 text-[#3F5EFB]'
          }`}
        >
          {feature.id.charAt(0).toUpperCase()}
        </div>
      </div>

      <h3 className={`text-lg font-semibold mb-3 transition-colors duration-200 ${
        isActive ? 'text-[#3F5EFB]' : 'text-white'
      }`}>
        {feature.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {feature.desc}
      </p>
    </div>
  );
};

const WhyChooseUs = () => {
  const dispatch = useDispatch();
  const activeFeatureId = useSelector((state) => state.whyChooseUs.activeFeatureId);

  const handleFeatureToggle = (featureId) => {
    if (activeFeatureId === featureId) {
      dispatch(clearActiveFeature());
    } else {
      dispatch(setActiveFeature(featureId));
    }
  };

  return (
    <div id="why-choose-us" className="container mx-auto py-16 px-4">
      {/* Header */}
      <div className="flex justify-center items-center flex-col text-white gap-y-4 mb-12">
        <h1 className="text-3xl font-semibold text-center">Why Choose Us</h1>
        <p className="mt-4 w-full lg:w-1/2 text-center text-gray-400">
          We bring together top talent, cutting-edge technology, and proven expertise
          to deliver exceptional results for every project.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES_DATA.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            isActive={activeFeatureId === feature.id}
            onToggle={() => handleFeatureToggle(feature.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
