
import dynamic from 'next/dynamic';

const ReportView = dynamic(() => import('@/app/components/reporteGenerar'), { ssr: false });

export default function GenerarReporte() {
  return <ReportView/>;
}