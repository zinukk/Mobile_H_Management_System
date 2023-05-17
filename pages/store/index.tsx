import { motion } from 'framer-motion';

const Store = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      매장페이지
    </motion.div>
  );
};

export default Store;
