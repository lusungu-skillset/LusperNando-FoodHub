import { motion } from "framer-motion";
import { FC } from "react";

interface FabProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  label?: string;
}

const fabVariants = {
  initial: { y: 100, opacity: 0, scale: 0.8 },
  animate: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 20 } },
  whileHover: { scale: 1.1, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" },
  whileTap: { scale: 0.95 },
};

export const Fab: FC<FabProps> = ({ onClick, icon, label }) => (
  <motion.button
    className="fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 px-6 py-4 text-white shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-300"
    initial="initial"
    animate="animate"
    whileHover="whileHover"
    whileTap="whileTap"
    variants={fabVariants}
    onClick={onClick}
    aria-label={label || "Floating Action Button"}
  >
    {icon || (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    )}
    {label && <span className="font-semibold text-base">{label}</span>}
  </motion.button>
);
