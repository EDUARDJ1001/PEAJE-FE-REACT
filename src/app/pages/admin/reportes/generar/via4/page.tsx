"use client"

import dynamic from 'next/dynamic';

const ReportVia4 = dynamic(() => import('@/app/components/reportVia4'), { ssr: false });

export default function GenerarReporte() {
  return <ReportVia4/>;
}