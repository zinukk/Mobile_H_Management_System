import { motion } from 'framer-motion';

const Error = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      에러 페이지
    </motion.div>
  );
};

export default Error;
