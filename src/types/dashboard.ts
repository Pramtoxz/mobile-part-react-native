export interface DashboardData {
  target: string;
  pencapaian: string;
  totalOmzet: string;
  produktivitas: string;
  pencapaianCampaign: string;
  realisasiVisit: string;
  efectifitasVisit: string;
  myRank: MyRank;
  salesManRank: LeaderboardItem[];
}

export interface MyRank {
  peringkat: string;
  rank: string;
  name: string;
  photo: string;
  type: 'NAIK' | 'TURUN' | 'BERTAHAN';
}

export interface LeaderboardItem {
  name: string;
  photo: string;
  peringkat: string;
  type: 'NAIK' | 'TURUN' | 'BERTAHAN';
}

export interface CheckInStatus {
  is_checked_in: boolean;
  dealer_name: string;
  code_visit: string;
}
