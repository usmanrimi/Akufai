'use client';

import React, { useState } from 'react';
import { Share2, Check, Link as LinkIcon } from 'lucide-react';

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={copyUrl}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#e6d58f] text-xs font-medium text-[#036c3e] bg-[#fcf8e8]/50 hover:bg-[#fcf8e8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#036c3e]"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-[#036c3e]" />
            <span className="text-[#036c3e] font-semibold">Link Copied</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5 text-[#b6960b]" />
            <span>Share</span>
          </>
        )}
      </button>
    </div>
  );
}
