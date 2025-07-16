import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className=" group bg-neutral-50 h-52 rounded-lg p-6 border shadow-lg hover:shadow-xl transition-shadow ease-in-out ">
      <div className="text-primary text-2xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-neutral-800 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-neutral-600">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
