// src/lib/constants.ts

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SERVICES = [
  {
    id: 'strategy',
    icon: 'BarChart2',
    titleEn: 'Strategy Consulting',
    titleKo: '전략 컨설팅',
    descEn: 'We align your digital ambitions with clear, actionable roadmaps tailored to your business context.',
    descKo: '비즈니스 목표에 맞는 디지털 전략 로드맵을 설계합니다.',
  },
  {
    id: 'transformation',
    icon: 'RefreshCw',
    titleEn: 'Digital Transformation',
    titleKo: '디지털 전환',
    descEn: 'End-to-end modernization of your systems, workflows, and customer experiences.',
    descKo: '시스템과 프로세스의 전방위적 디지털 전환을 지원합니다.',
  },
  {
    id: 'development',
    icon: 'Code2',
    titleEn: 'Custom Development',
    titleKo: '맞춤 개발',
    descEn: 'Web and app solutions engineered precisely for your requirements — no templates, no shortcuts.',
    descKo: '요구사항에 맞게 설계된 웹·앱 솔루션을 제공합니다.',
  },
] as const;

export const ABOUT_STATS = [
  { value: 50, suffix: '+', labelEn: 'Projects Delivered', labelKo: '프로젝트 완료' },
  { value: 3,  suffix: '+', labelEn: 'Years of Experience', labelKo: '운영 연수' },
  { value: 20, suffix: '+', labelEn: 'Global Clients', labelKo: '글로벌 클라이언트' },
] as const;

export const SOCIAL_LINKS = [
  { platform: 'LinkedIn', href: 'https://linkedin.com/company/magnatekorea' },
  { platform: 'GitHub',   href: 'https://github.com/magnatekorea' },
] as const;

export const CONTACT_EMAIL = 'hello@magnatekorea.com';

// Spline embed (iframe viewer link from Spline "Share → Embed").
// To swap scenes: open in Spline editor → Share → copy the my.spline.design URL.
export const SPLINE_VIEWER_URL =
  process.env.NEXT_PUBLIC_SPLINE_VIEWER_URL ??
  'https://my.spline.design/nexbotrobotcharacterconcept-qBCBPTsCSmcuOrmVTm0vsbbX/';