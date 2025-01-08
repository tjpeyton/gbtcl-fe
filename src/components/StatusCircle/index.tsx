
export interface StatusCircleProps {
    status: 'active' | 'inactive' | 'pending'
}

const StatusCircle = ({ status }: StatusCircleProps) => {
  return (
    <div className={`w-4 h-4 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
  ) 
}   

export default StatusCircle
