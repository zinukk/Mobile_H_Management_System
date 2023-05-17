import { motion } from 'framer-motion';

const Robot = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      로봇페이지
    </motion.div>
  );
};

export default Robot;
