"use client"

import dynamic from 'next/dynamic';

const ReportVia3 = dynamic(() => import('@/app/components/reportVia3'), { ssr: false });

export default function GenerarReporte() {
  return <ReportVia3/>;
}