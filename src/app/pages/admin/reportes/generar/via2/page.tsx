"use client"

import dynamic from 'next/dynamic';

const ReportVia2 = dynamic(() => import('@/app/components/reportVia2'), { ssr: false });

export default function GenerarReporte() {
  return <ReportVia2/>;
}