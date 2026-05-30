import type { Metadata } from 'next'
import Link from 'next/link'
import { CONTACT_EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: '개인정보처리방침 — Magnate Korea',
  description: 'Magnate Korea 개인정보처리방침',
}

export default function PrivacyPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <div className="container-app py-24 max-w-3xl">
        <Link
          href="/"
          className="font-inter text-accent text-sm hover:underline"
        >
          ← Magnate Korea
        </Link>

        <h1 className="font-syne font-extrabold text-3xl md:text-4xl mt-6 mb-2">
          개인정보처리방침
        </h1>
        <p className="font-inter text-[#666666] text-sm mb-12">
          최종 업데이트: 2026년 5월
        </p>

        <div className="flex flex-col gap-10 font-inter text-[#aaaaaa] leading-relaxed text-[15px]">
          <section>
            <h2 className="font-syne font-semibold text-white text-xl mb-3">
              1. 수집하는 개인정보 항목
            </h2>
            <p>
              마그네이트코리아(Magnate Korea)는 문의하기 양식을 통해 다음 정보를
              수집합니다: 이름, 이메일 주소, 문의 내용. 이 정보는 문의 응대 목적
              외에는 사용되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-semibold text-white text-xl mb-3">
              2. 개인정보의 이용 목적
            </h2>
            <p>
              수집된 정보는 고객 문의에 대한 답변 및 상담, 서비스 제공을 위한
              연락 목적으로만 이용됩니다.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-semibold text-white text-xl mb-3">
              3. 보유 및 이용 기간
            </h2>
            <p>
              개인정보는 문의 처리 완료 후 관련 법령에 따른 보존 기간을 제외하고
              지체 없이 파기합니다.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-semibold text-white text-xl mb-3">
              4. 제3자 제공 및 처리 위탁
            </h2>
            <p>
              문의 양식 전송은 외부 폼 처리 서비스(Web3Forms)를 통해 이루어지며,
              해당 서비스는 이메일 전달 목적으로만 정보를 처리합니다. 그 외
              제3자에게 개인정보를 제공하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="font-syne font-semibold text-white text-xl mb-3">
              5. 문의처
            </h2>
            <p>
              개인정보 관련 문의는{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{' '}
              로 연락 주시기 바랍니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
