import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
}

const PremiumModal = ({ open, onClose }: PremiumModalProps) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
          >
            <div className="w-full max-w-[390px] bg-card rounded-t-[24px] p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Crown className="text-pulse-gold" size={24} />
                  <span className="text-lg font-bold text-foreground">Pulse Premium</span>
                </div>
                <button onClick={onClose} className="tap-scale text-muted-foreground">
                  <X size={20} />
                </button>
              </div>
              <p className="text-muted-foreground text-sm mb-4">This feature requires Pulse Premium. Unlock the full experience.</p>
              <button
                onClick={() => { onClose(); navigate('/premium'); }}
                className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-pill tap-scale"
              >
                See Premium Plans
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PremiumModal;
