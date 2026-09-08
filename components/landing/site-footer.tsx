import Image from 'next/image'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-wrap items-center gap-3">
          <Image
            src="/ibk-logo.png"
            alt="IBK 기업은행"
            width={40}
            height={38}
            className="h-8 w-auto"
          />
          <span className="text-sm font-bold text-ink">기업은행</span>
        </div>

        <p className="mt-6 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground">
          본 콘텐츠는 IBK B-RETAIL 및 B-F&B 카드의 주요 혜택을 알기 쉽게 소개하기
          위한 홍보 콘텐츠입니다. 카드 이용 전 상품설명서 및 약관을 반드시
          확인하시기 바랍니다.
        </p>

        <div className="mt-8 grid gap-6 border-t border-border pt-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-bold text-ink">고객센터</p>
            <p className="mt-2 text-muted-foreground">IBK카드 1588-1770</p>
            <p className="text-muted-foreground">평일 09:00 ~ 18:00</p>
          </div>
          <div>
            <p className="font-bold text-ink">상품 유의사항</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              적립률·전월실적·적립한도·적립 제외 항목 등은 상품설명서 및 약관을
              기준으로 합니다.
            </p>
          </div>
          <div>
            <p className="font-bold text-ink">개인정보</p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-ink">
                  개인정보 처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-ink">
                  이용약관
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-ink">준법 관련</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              준법감시인 심의필 제0000-00호
              <br />
              (제작 관련 안내)
            </p>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} IBK Industrial Bank of Korea. 본 페이지는
          홍보 목적으로 제작되었습니다.
        </p>
      </div>
    </footer>
  )
}
