"use client"

import dynamic from 'next/dynamic';

const ReportVia1 = dynamic(() => import('@/app/components/reportVia1'), { ssr: false });

export default function GenerarReporte() {
  return <ReportVia1/>;
}