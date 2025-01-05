import { motion } from "motion/react"


export type CountdownDisplayProps = {
    value: number
    label: string
}

export const CountdownDisplay = ({ value, label }: CountdownDisplayProps) => (
    <motion.div 
      className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span 
        className="text-4xl font-bold text-blue-600"
        key={value}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      >
        {value}
      </motion.span>
      <span className="text-sm text-gray-500">{label}</span>
    </motion.div>
)
