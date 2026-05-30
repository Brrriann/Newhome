import { BrowserFrame } from './Frames'

/** E-commerce / landing storefront. */
export default function EcommerceMockup() {
  const products = [
    { n: 'Aurora Lamp', p: '₩89,000' },
    { n: 'Nimbus Chair', p: '₩240,000' },
    { n: 'Echo Speaker', p: '₩159,000' },
    { n: 'Pulse Watch', p: '₩320,000' },
  ]
  return (
    <BrowserFrame url="shop.magnatekorea.com">
      <div className="h-[380px] font-inter text-[11px] overflow-hidden">
        {/* Nav */}
        <div className="flex items-center justify-between px-4 h-10 border-b border-white/5">
          <span className="font-syne font-bold text-white text-xs">STORE</span>
          <div className="flex gap-3 text-[#888]">
            <span>Shop</span>
            <span>About</span>
            <span className="text-accent">Cart (2)</span>
          </div>
        </div>

        {/* Hero */}
        <div className="px-4 py-4 flex items-center justify-between bg-gradient-to-r from-accent/10 to-transparent">
          <div>
            <div className="text-white font-syne font-extrabold text-lg leading-tight">
              New Season
              <br />
              Collection
            </div>
            <div className="mt-2 inline-block rounded bg-accent text-black px-3 py-1 text-[10px] font-semibold">
              Shop Now →
            </div>
          </div>
          <div className="w-20 h-16 rounded-lg bg-white/[0.05] border border-white/10" />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-4 gap-2 px-4 pt-3">
          {products.map((pr) => (
            <div key={pr.n}>
              <div className="aspect-square rounded-lg bg-white/[0.04] border border-white/10 relative">
                <span className="absolute top-1 right-1 text-accent text-[10px]">
                  ♡
                </span>
              </div>
              <div className="text-white mt-1.5 truncate">{pr.n}</div>
              <div className="text-[#888] text-[10px]">{pr.p}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  )
}
