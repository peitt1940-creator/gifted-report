import React, { useState, useEffect, useRef } from 'react';
import { Camera, FileText, Download, ChevronRight, ChevronDown, ArrowLeft, Trash2, Home, Cloud, Loader2, LayoutDashboard, CheckCircle, Eye, X, AlertTriangle, RotateCw, ZoomIn, ZoomOut, HardDriveDownload, HardDriveUpload, ArrowUp, ArrowDown, Info, Check, Edit3, FolderOpen, LayoutGrid, Square } from 'lucide-react';

// --- 完整評鑑指標、效標與官方檢核資料參考 (依據《附件4-資優自評.docx》完整校對) ---
const EVALUATION_DATA = [
  {
    id: "dim1",
    title: "一、行政運作與融合教育",
    indicators: [
      {
        id: "ind1-1",
        title: "指標 1-1 特殊教育推行委員會定期討論特殊教育相關事務，並落實成效檢討",
        criteria: [
          {
            id: "crt1-1-1",
            title: "效標 1-1-1：依主管機關規定，訂定學校特殊教育推行委員會設置要點（含工作任務、委員組成、召開方式等），並依法組成委員會。",
            checklists: [
              "特殊教育推行委員會設置要點（組織符合法令、含委員組成、召開方式等）。",
              "委員組成符合規定（註明委員代表身分別）。"
            ]
          },
          {
            id: "crt1-1-2",
            title: "效標 1-1-2：召開會議，執行主管機關規定之任務，其執行成效及追蹤執行情形均納入會議討論並留有紀錄。",
            checklists: [
              "特殊教育推行委員會會議紀錄，每學期至少召開二次（提案討論應辦事項/提案或決議，如執行主管機關規定之任務、任務執行成效及追蹤執行情形等）。",
              "會議簽到表（校長與各處室主任能參與會議）。"
            ]
          }
        ]
      },
      {
        id: "ind1-2",
        title: "指標 1-2 學校能成立學生申訴評議會，委員人數及組成符合法令規定",
        criteria: [
          {
            id: "crt1-2-1",
            title: "效標 1-2-1：學校學生申訴評議委員會處理特殊教育學生申訴時，增聘至少二人與特殊教育需求情況相關之校外特殊教育學者專家、特殊教育家長團體代表或其他特殊教育專業人員擔任委員，以處理特殊教育學生申訴評議事宜。",
            checklists: [
              "特殊教育（資優）學生申訴案件之評議會議簽到表（受評期間資優生申訴會議紀錄註明增聘委員）（受評期間若無申訴案件免附）。"
            ]
          }
        ]
      },
      {
        id: "ind1-3",
        title: "指標 1-3 校長協調相關資源，提供教師支持，包含特殊教育學生與其他學生需求",
        criteria: [
          {
            id: "crt1-3-1",
            title: "效標 1-3-1：校長協調校內各單位提供教師及特殊教育學生所需人力資源及協助。",
            checklists: [
              "校長協調人力資源會議紀錄，提案或決議中具跨單位協調之具體事例（如普通班教師/輔導教師/特教教師/專業人員的合作、安排與學生輔導等）。",
              "學生所需人力資源協助與支持，IGP會議、個案會議、跨專業團隊討論，展現資源協調成效等。"
            ]
          },
          {
            id: "crt1-3-2",
            title: "效標 1-3-2：校長協調校內各單位提供教師所需教學空間及設施設備。",
            checklists: [
              "特教相關會議及行政會議記錄、簽呈、充實教學設備計畫書等，呈現協調教學空間與設備的討論與決策、教學環境改善等執行狀況或成果。",
              "資優班教室空間與硬體設施設備配置。"
            ]
          },
          {
            id: "crt1-3-3",
            title: "效標 1-3-3：校長能連結校外資源（如：政府機關、民間組織或團體、社區志工等）。",
            checklists: [
              "合作公文、合約、會議紀錄、活動計畫與照片等，如專業講座、社區活動、戶外教育等，顯示資源運用情況（社區志工、民間團體贊助、外部專家參與特殊教育的紀錄等）。"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "dim2",
    title: "二、教育計畫與團隊合作",
    indicators: [
      {
        id: "ind2-1",
        title: "指標 2-1 個別輔導計畫參與人員符合規定並以團隊合作方式訂定計畫",
        criteria: [
          {
            id: "crt2-1-1",
            title: "效標 2-1-1：學校依學生特殊需求透過團隊合作討論訂定 IGP。",
            checklists: [
              "訂定 IGP 之簽到表、會議紀錄等（每班至少 2 份、每班每位教師至少 1 份為原則）。",
              "邀請家長（法定代理人/實際照顧者）及學生本人參與。"
            ]
          }
        ]
      },
      {
        id: "ind2-2",
        title: "指標 2-2 個別輔導計畫訂定及內容符合規定",
        criteria: [
          {
            id: "crt2-2-1",
            title: "效標 2-2-1：IGP 應於開學前訂定，新生及轉學生應於入學後一個月內訂定初步 IGP，且 IGP 每學期至少檢討一次。",
            checklists: [
              "訂定及檢討 IGP 之簽到表、會議紀錄等（每班至少 2 份、每班每位教師至少 1 份為原則）。"
            ]
          },
          {
            id: "crt2-2-2",
            title: "效標 2-2-2：每位特殊教育學生均有 IGP，且內容項目符合《特殊教育法施行細則》第 13 條規定。",
            checklists: [
              "呈現完整 IGP，內容項目符合特殊教育法施行細則第 13 條規定等（每班至少 2 份、每班每位教師至少 1 份為原則）。"
            ]
          },
          {
            id: "crt2-2-3",
            title: "效標 2-2-3：雙重特殊學生應將 IGP 納入 IEP 中。",
            checklists: [
              "有雙重特殊需求學生，學校應將 IGP 納入 IEP 中（受評學校若有雙重特殊需求學生，應上傳一份將 IGP 納入的 IEP）。",
              "無雙重特殊需求學生個案免傳（無則免附）。"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "dim3",
    title: "三、課程教學與專業發展",
    indicators: [
      {
        id: "ind3-1",
        title: "指標 3-1 特殊教育課程規劃符合法規及學生特殊需求",
        criteria: [
          {
            id: "crt3-1-1",
            title: "效標 3-1-1：特殊教育課程應依學生特殊需求，彈性調整學習內容、歷程、環境、評量、學習節數及學分數。",
            checklists: [
              "每一開課之領域（科目）皆有該領域（科目）課程計畫。",
              "課程目標適切與課程內容相符合，彈性調整學習內容、歷程、環境、評量。",
              "安排之抽離、外加之領域（科目）及節數/學分數符合十二年國民基本教育特殊教育課程實施規範規定。"
            ]
          },
          {
            id: "crt3-1-2",
            title: "效標 3-1-2：開設之領域（含特殊需求領域）／科目及分組排課符合學生特殊需求，且學校有協助排課機制。",
            checklists: [
              "開課之領域（科目）及節數分配適切，符應學生需求（如：分組表、協同教學名單、班級課表）。",
              "規劃特殊需求領域課程。",
              "安排多元適性課程。",
              "學校排課規範與原則，協助排課會議紀錄或行政簽辦文件。"
            ]
          }
        ]
      },
      {
        id: "ind3-2",
        title: "指標 3-2 特殊教育班課程依法定程序納入學校課程計畫審議，並有評鑑機制",
        criteria: [
          {
            id: "crt3-2-1",
            title: "效標 3-2-1：學校特殊教育班課程規劃經特殊教育推行委員會審議通過，納入學校課程計畫經課程發展委員會通過。",
            checklists: [
              "特殊教育推行委員會及課程發展委員會會議紀錄（討論特殊教育課程）。"
            ]
          },
          {
            id: "crt3-2-2",
            title: "效標 3-2-2：學校課程發展委員會納入特殊教育教師代表。",
            checklists: [
              "學校課程發展委員會委員包含特教教師代表（會議簽到表標註特殊教育教師代表）。"
            ]
          }
        ]
      },
      {
        id: "ind3-3",
        title: "指標 3-3 落實特殊教育學生課程調整",
        criteria: [
          {
            id: "crt3-3-1",
            title: "效標 3-3-1：普通班教師參與 IGP 討論，並依據特殊教育學生特殊需求與討論結果執行普通班課程調整，包含學習內容、歷程、環境及評量之調整。（※高中集中式藝才資優班不適用）",
            checklists: [
              "普通班教師/導師參與 IGP 討論，確認學生所需包含學習內容、歷程、環境及評量之調整方式（IGP 會議紀錄）。",
              "導師或各科授課教師能依 IGP 執行教學與評量調整，呈現課程調整檢核表、相關紀錄、普通班調整的學習單教材或合作支持、輔導紀錄等。"
            ]
          },
          {
            id: "crt3-3-2",
            title: "效標 3-3-2：教師依據特殊教育學生特殊需求執行課程調整，包含學習內容、歷程、環境及評量之調整。（※分散式資源班/方案不適用）",
            checklists: [
              "依據學生需求提供適當課程（含專長及特需課程調整）、教學與相關服務。"
            ]
          }
        ]
      },
      {
        id: "ind3-4",
        title: "指標 3-4 學校規劃辦理或鼓勵行政人員、普通教育教師和特殊教育教師主動參與專業進修",
        criteria: [
          {
            id: "crt3-4-1",
            title: "效標 3-4-1：學校辦理特殊教育（資優）研習。",
            checklists: [
              "辦理特殊教育知能研習之實施計畫、簽到表等。"
            ]
          },
          {
            id: "crt3-4-2",
            title: "效標 3-4-2：學校有鼓勵教師參與特殊教育研習之機制。",
            checklists: [
              "鼓勵行政人員、教師參與特殊教育研習，如：公假登記、補休或差旅等簽辦文件與宣導資料。"
            ]
          },
          {
            id: "crt3-4-3",
            title: "效標 3-4-3：普通教育教師和特殊教育教師進修特殊教育相關之專業知能。",
            checklists: [
              "普通班教師、特殊教育教師積極參加融合/特殊教育知能研習時數證明資料（得提供全國教師在職進修網及全國特殊教育資訊網下載資料佐證）。"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "dim4",
    title: "四、支持服務與輔導轉銜",
    indicators: [
      {
        id: "ind4-1",
        title: "指標 4-1 提供特殊教育學生家庭諮詢、輔導、親職教育及轉介等支持服務",
        criteria: [
          {
            id: "crt4-1-1",
            title: "效標 4-1-1：學校利用多元方式及管道（如：晤談、座談、個案輔導、成長團體及其他適當方式），提供特殊教育學生家庭支持服務，並留有紀錄。",
            checklists: [
              "資優學生家長家庭諮詢、個案輔導、成長團體、轉介與資優教育相關研習或資訊之宣導紀錄。",
              "辦理親職講座、親師座談或家長日等活動資料。"
            ]
          }
        ]
      }
    ]
  }
];

// ID 對照表與全部效標陣列
const CRITERIA_MAP = {};
const ALL_CRITERIA_IDS = [];
EVALUATION_DATA.forEach(dim => {
  dim.indicators.forEach(ind => {
    ind.criteria.forEach(crit => {
      ALL_CRITERIA_IDS.push(crit.id);
      CRITERIA_MAP[crit.id] = {
        id: crit.id,
        dimTitle: dim.title,
        indTitle: ind.title,
        title: crit.title,
        shortCode: crit.title.split("：")[0],
        fullText: crit.title,
        checklists: crit.checklists || []
      };
    });
  });
});

// 載入 html2pdf
const loadHtml2Pdf = () => {
  if (!window.html2pdf) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    document.head.appendChild(script);
  }
};

// 圖片壓縮工具 (確保瀏覽器暫存流暢並兼顧列印清晰度)
const resizeImage = (base64Str, maxWidth = 1400) => {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.88));
    };
  });
};

// 工具：將陣列分割成小塊
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

// 工具：根據每張照片個別設定的 perPage (1: 單張滿版, 2: 雙圖並排) 進行智慧分頁
// 支援同一份效標中同時混排「一頁一圖」與「一頁兩圖」
const groupPhotosIntoPages = (photos = [], fallbackPerPage = 2) => {
  const pages = [];
  let pendingTwoPageItem = null;

  photos.forEach((photo, idx) => {
    const mode = photo.perPage === 1 ? 1 : (photo.perPage === 2 ? 2 : (fallbackPerPage === 1 ? 1 : 2));
    const itemWithIndex = { ...photo, globalIdx: idx, mode };

    if (mode === 1) {
      // 若前一張是等待配對的「一頁兩圖」，先將前一張獨立結算成一頁，避免與單張滿版擠在同一頁
      if (pendingTwoPageItem) {
        pages.push({
          layoutMode: 2,
          items: [pendingTwoPageItem]
        });
        pendingTwoPageItem = null;
      }
      pages.push({
        layoutMode: 1,
        items: [itemWithIndex]
      });
    } else {
      // mode === 2
      if (pendingTwoPageItem) {
        pages.push({
          layoutMode: 2,
          items: [pendingTwoPageItem, itemWithIndex]
        });
        pendingTwoPageItem = null;
      } else {
        pendingTwoPageItem = itemWithIndex;
      }
    }
  });

  if (pendingTwoPageItem) {
    pages.push({
      layoutMode: 2,
      items: [pendingTwoPageItem]
    });
  }

  return pages;
};

// --- IndexedDB 輔助工具 (搭配 localStorage 雙重保障，支援大量高畫質照片暫存於本地瀏覽器) ---
const DB_NAME = 'GiftedEvalFormatterDB';
const STORE_NAME = 'workspace';

const saveToIndexedDB = (data) => {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = (e) => {
        const db = e.target.result;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(data, 'currentWorkspace');
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      };
      request.onerror = () => resolve(false);
    } catch (err) {
      resolve(false);
    }
  });
};

const loadFromIndexedDB = () => {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = (e) => {
        const db = e.target.result;
        const tx = db.transaction(STORE_NAME, 'readonly');
        const getReq = tx.objectStore(STORE_NAME).get('currentWorkspace');
        getReq.onsuccess = () => resolve(getReq.result || null);
        getReq.onerror = () => resolve(null);
      };
      request.onerror = () => resolve(null);
    } catch (err) {
      resolve(null);
    }
  });
};

// --- 子元件定義：黑白灰專業排版預覽與匯出核心 ---
const ReportContent = ({ projectData, isInteractive = false, onUpdatePhotoSettings = null }) => {
  const { schoolName, selectedCriteria, evidenceData } = projectData;
  const displaySchoolName = schoolName && schoolName.trim() ? schoolName : "高雄市立OO國小/國中資優評鑑報告";
  const selectedSet = new Set(selectedCriteria || []);

  const dataToRender = EVALUATION_DATA.map(dim => ({
    ...dim,
    indicators: dim.indicators.map(ind => ({
      ...ind,
      criteria: ind.criteria.filter(crit => selectedSet.has(crit.id))
    })).filter(ind => ind.criteria.length > 0)
  })).filter(dim => dim.indicators.length > 0);

  const rotateImage = (critId, idx) => {
    if (onUpdatePhotoSettings) onUpdatePhotoSettings(critId, idx, 'rotate');
  };

  const zoomImage = (critId, idx, direction) => {
    if (onUpdatePhotoSettings) onUpdatePhotoSettings(critId, idx, direction === 'in' ? 'zoomIn' : 'zoomOut');
  };

  const togglePhotoLayoutMode = (critId, idx, targetMode) => {
    if (onUpdatePhotoSettings) onUpdatePhotoSettings(critId, idx, targetMode === 1 ? 'setMode1' : 'setMode2');
  };

  // 扁平化所有照片分頁群組，支援同一效標內逐圖設定「一頁一圖」或「一頁兩圖」混排
  const allPhotoChunks = [];
  dataToRender.forEach(dim => {
    dim.indicators.forEach(ind => {
      ind.criteria.forEach(crit => {
        const critEvidence = evidenceData[crit.id] || {};
        const photos = critEvidence.photos || [];
        const fallbackPerPage = critEvidence.photosPerPage === 1 ? 1 : 2;
        if (photos.length > 0) {
          const pages = groupPhotosIntoPages(photos, fallbackPerPage);
          pages.forEach((pageObj, pageIndex) => {
            allPhotoChunks.push({
              crit,
              chunk: pageObj.items,
              chunkIndex: pageIndex,
              layoutMode: pageObj.layoutMode
            });
          });
        }
      });
    });
  });

  return (
    <div className="bg-white w-full max-w-[210mm] min-h-[297mm] p-[10mm] shadow-2xl mx-auto text-black leading-normal mb-8" style={{ fontFamily: '"Noto Sans TC", sans-serif' }}>
      {/* 壹、文字說明區塊 */}
      <div className="report-section text-section">
        <div className="text-center mb-8 border-b-4 border-gray-900 pb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 mt-0 text-black">{displaySchoolName}</h1>
        </div>

        {dataToRender.map(dim => (
          <div key={`text-dim-${dim.id}`} className="mb-6">
            <h2 className="text-2xl font-bold bg-gray-200 p-3 border-l-8 border-gray-800 mb-4 mt-0 break-after-avoid text-black rounded-r-lg">
              {dim.title}
            </h2>
            {dim.indicators.map(ind => (
              <div key={`text-ind-${ind.id}`} className="mb-4 pl-2">
                {ind.criteria.map(crit => (
                  <div key={`text-crit-${crit.id}`} className="mb-6 break-inside-avoid">
                    <div className="mb-2">
                      <h4 className="font-bold text-black text-xl">{crit.title}</h4>
                    </div>
                    <div className="bg-gray-100 p-4 border-l-4 border-gray-600 pl-5 text-lg text-black leading-relaxed whitespace-pre-wrap break-words rounded-r-lg">
                      <span className="font-bold text-black mr-2">【執行情形】：</span>
                      {evidenceData[crit.id]?.description || "（尚無說明文字）"}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* 貳、相關佐證資料區塊 */}
      {allPhotoChunks.length > 0 && (
        <div className="report-section evidence-section">
          {allPhotoChunks.map((chunkData, index) => {
            // 若該頁為「一頁一圖」模式，或雖然設為「一頁兩圖」但該頁只有單張圖片時，皆可自動給予安全滿版空間
            const isSingleItemOnPage = chunkData.chunk.length === 1;
            const isOnePerPageMode = chunkData.layoutMode === 1;

            return (
              <div key={`evidence-chunk-${chunkData.crit.id}-${index}`} style={{ pageBreakBefore: 'always', breakBefore: 'page', paddingTop: '4mm' }}>
                {index === 0 && (
                  <div className="text-center mb-3 border-b-4 border-gray-900 pb-2">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-1 mt-0 text-black">貳、相關佐證資料</h1>
                  </div>
                )}

                <div className="border-b-2 border-gray-400 mb-3 pb-1 flex justify-between items-center">
                  <span className="font-bold text-black bg-transparent px-0 py-0.5 rounded text-lg inline-block">
                    {CRITERIA_MAP[chunkData.crit.id]?.shortCode || chunkData.crit.id} 佐證資料 {chunkData.chunkIndex > 0 ? `(續${chunkData.chunkIndex})` : ''}
                  </span>
                </div>

                <div className="flex flex-col gap-3.5">
                  {chunkData.chunk.map((photoObj, i) => {
                    const globalIdx = photoObj.globalIdx;
                    const rotation = photoObj.rotation || 0;
                    const scale = photoObj.scale || 1;
                    const itemMode = photoObj.mode || 2;

                    const captionLen = photoObj.caption ? photoObj.caption.length : 0;
                    const fontSize = (isOnePerPageMode || isSingleItemOnPage)
                      ? (captionLen < 80 ? '14px' : '12.5px')
                      : (captionLen < 45 ? '13.5px' : (captionLen < 100 ? '12px' : '11px'));

                    // 嚴密計算 A4 (297mm) 單頁可用像素高度，確保無論是單圖頁或雙圖頁，圖+文總高度 100% 落在單一 A4 頁面內，絕不跨頁或裁切
                    let dynamicImgHeight;
                    if (isOnePerPageMode) {
                      // 一頁一圖：最大化單頁空間（首頁須扣除「貳、相關佐證資料」大標題高度）
                      const baseOneHeight = index === 0 ? 610 : 685;
                      const captionPenalty = captionLen > 50 ? Math.min(130, (captionLen - 50) * 0.85) : 0;
                      dynamicImgHeight = Math.floor(baseOneHeight - captionPenalty);
                    } else if (isSingleItemOnPage) {
                      // 設為一頁兩圖但落單成為該頁唯一一張圖時，適度放大以完整利用版面
                      const baseSingleTwoHeight = index === 0 ? 520 : 580;
                      const captionPenalty = captionLen > 50 ? Math.min(110, (captionLen - 50) * 0.8) : 0;
                      dynamicImgHeight = Math.floor(baseSingleTwoHeight - captionPenalty);
                    } else {
                      // 一頁兩圖（同頁有 2 張圖）：考究兩張圖各自的圖說長度總和，動態分配安全高度
                      const totalCaptionsLen = chunkData.chunk.reduce((acc, cur) => acc + (cur.caption ? cur.caption.length : 0), 0);
                      const baseTwoHeight = index === 0 ? 295 : 335;
                      const captionPenalty = totalCaptionsLen > 70 ? Math.min(65, (totalCaptionsLen - 70) * 0.35) : 0;
                      dynamicImgHeight = Math.floor(baseTwoHeight - captionPenalty);
                    }

                    return (
                      <div key={i} className="flex flex-col shadow-sm border border-gray-300 rounded-lg overflow-hidden bg-white relative group" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                        {isInteractive && (
                          <div
                            className="absolute top-2 right-2 flex items-center gap-1 bg-black/75 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            data-html2canvas-ignore="true"
                          >
                            <button
                              onClick={() => togglePhotoLayoutMode(chunkData.crit.id, globalIdx, 1)}
                              className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${itemMode === 1 ? 'bg-white text-black' : 'text-gray-200 hover:bg-white/20'}`}
                              title="將此圖設為「一頁一圖（獨立滿版）」"
                            >
                              一頁一圖
                            </button>
                            <button
                              onClick={() => togglePhotoLayoutMode(chunkData.crit.id, globalIdx, 2)}
                              className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${itemMode === 2 ? 'bg-white text-black' : 'text-gray-200 hover:bg-white/20'}`}
                              title="將此圖設為「一頁兩圖（與相鄰雙圖並排）」"
                            >
                              一頁兩圖
                            </button>
                            <span className="text-gray-500 mx-0.5">|</span>
                            <button onClick={() => zoomImage(chunkData.crit.id, globalIdx, 'out')} className="p-1 text-white hover:bg-white/20 rounded" title="縮小"><ZoomOut size={15} /></button>
                            <button onClick={() => zoomImage(chunkData.crit.id, globalIdx, 'in')} className="p-1 text-white hover:bg-white/20 rounded" title="放大"><ZoomIn size={15} /></button>
                            <button onClick={() => rotateImage(chunkData.crit.id, globalIdx)} className="p-1 text-white hover:bg-white/20 rounded" title="向右旋轉 90 度"><RotateCw size={15} /></button>
                          </div>
                        )}

                        <div
                          className="bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-300 p-1.5"
                          style={{ height: `${dynamicImgHeight}px` }}
                        >
                          <img
                            src={photoObj.url}
                            alt={`evidence-${globalIdx}`}
                            style={{
                              width: `${scale * 100}%`,
                              maxHeight: '100%',
                              transform: `rotate(${rotation}deg)`,
                              transition: 'transform 0.3s, width 0.3s'
                            }}
                            className="max-w-full w-auto object-contain origin-center"
                          />
                        </div>
                        <div className="bg-gray-100 px-4 py-2 text-left border-t border-gray-300">
                          <div
                            className="text-black font-bold block whitespace-pre-wrap break-words"
                            style={{ fontSize: fontSize, lineHeight: '1.4' }}
                          >
                            圖 {globalIdx + 1}：{photoObj.caption || "（無照片說明）"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// 清空單一效標確認 Modal
const ClearCriterionModal = ({ critId, onClose, onConfirm }) => {
  if (!critId) return null;
  const info = CRITERIA_MAP[critId];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">確定清空此效標內容？</h3>
        <p className="text-gray-500 text-sm mb-6">
          即將清空「{info?.shortCode}」的執行說明與已上傳照片，此動作無法復原。
        </p>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium">取消</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition font-medium">確認清空</button>
        </div>
      </div>
    </div>
  );
};

const PreviewModal = ({ projectData, onClose, onGeneratePDF, onGenerateDoc, isGeneratingPdf, isGeneratingDoc }) => {
  if (!projectData) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-fade-in">
        <div className="bg-gray-900 p-4 flex justify-between items-center text-white shrink-0">
          <h3 className="font-bold text-lg flex items-center"><Eye className="mr-2" /> 預覽：{projectData.titleLabel || projectData.schoolName}</h3>
          <button onClick={onClose} className="hover:bg-gray-700 rounded-full p-1"><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6 md:p-8">
          <div id="preview-modal-content">
            <ReportContent projectData={projectData} isInteractive={false} />
          </div>
        </div>
        <div className="bg-white p-4 border-t flex flex-wrap justify-end gap-3 shrink-0">
          <button onClick={onGenerateDoc} disabled={isGeneratingDoc} className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold flex items-center text-sm shadow">
            {isGeneratingDoc ? <Loader2 className="animate-spin mr-2" size={18} /> : <FileText className="mr-2" size={18} />} 下載 Word 檔 (.doc)
          </button>
          <button onClick={onGeneratePDF} disabled={isGeneratingPdf} className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold flex items-center text-sm shadow">
            {isGeneratingPdf ? <Loader2 className="animate-spin mr-2" size={18} /> : <Download className="mr-2" size={18} />} 下載 PDF 檔 (.pdf)
          </button>
          <button onClick={onClose} className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-bold text-sm">關閉</button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const STORAGE_KEY_META = 'gifted_eval_workspace_meta_v2';

export default function App() {
  // 頁面狀態：'setup' (初次設定校名) | 'dashboard' (四大領域總儀表板) | 'criterion_editor' (單一效標編輯與預覽)
  const [view, setView] = useState('setup');
  const [isLoaded, setIsLoaded] = useState(false);

  // 名稱預先填入「高雄市立OO國小/國中資優評鑑報告」
  const [schoolName, setSchoolName] = useState("高雄市立OO國小/國中資優評鑑報告");
  const [isEditingSchoolName, setIsEditingSchoolName] = useState(false);
  const [evidenceData, setEvidenceData] = useState({});
  const [activeCriterionId, setActiveCriterionId] = useState(null);
  const [editorTab, setEditorTab] = useState('edit'); // 'edit' | 'preview'

  // 調整 2：儀表板各效標預設為「全部收合」，減少版面混亂
  const [expandedDims, setExpandedDims] = useState({
    dim1: false,
    dim2: false,
    dim3: false,
    dim4: false
  });

  const [previewProjectData, setPreviewProjectData] = useState(null);
  const [clearConfirmCritId, setClearConfirmCritId] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const fileInputRef = useRef(null);
  const schoolNameInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  // 初次載入：從瀏覽器本地儲存 (IndexedDB + localStorage) 復原資料，避免重新整理消失
  useEffect(() => {
    loadHtml2Pdf();

    const restoreWorkspace = async () => {
      try {
        const idbData = await loadFromIndexedDB();
        const lsMetaRaw = localStorage.getItem(STORAGE_KEY_META);
        const lsMeta = lsMetaRaw ? JSON.parse(lsMetaRaw) : null;

        if (idbData && idbData.isInitialized) {
          setSchoolName(idbData.schoolName || "高雄市立OO國小/國中資優評鑑報告");
          setEvidenceData(idbData.evidenceData || {});
          setView('dashboard');
        } else if (lsMeta && lsMeta.isInitialized) {
          setSchoolName(lsMeta.schoolName || "高雄市立OO國小/國中資優評鑑報告");
          setEvidenceData(lsMeta.evidenceData || {});
          setView('dashboard');
        }
      } catch (err) {
        console.error("Failed to restore local data:", err);
      } finally {
        setIsLoaded(true);
      }
    };

    restoreWorkspace();
  }, []);

  // 當 schoolName 或 evidenceData 變更時，自動同步寫入瀏覽器本地儲存 (IndexedDB + localStorage)
  useEffect(() => {
    if (!isLoaded) return;
    if (view === 'setup') return;

    const payload = {
      isInitialized: true,
      schoolName,
      evidenceData,
      updatedAt: new Date().toISOString()
    };

    // 寫入大容量 IndexedDB (含照片 Base64)
    saveToIndexedDB(payload);

    // 同步嘗試寫入 localStorage 作為雙重備援
    try {
      localStorage.setItem(STORAGE_KEY_META, JSON.stringify(payload));
    } catch (e) {
      // 若照片超過 localStorage 5MB 上限，僅在 localStorage 保存校名與文字說明，照片由 IndexedDB 負責保存
      try {
        const textOnlyEvidence = {};
        Object.keys(evidenceData).forEach(k => {
          textOnlyEvidence[k] = {
            description: evidenceData[k]?.description || "",
            photos: [],
            completed: Boolean(evidenceData[k]?.completed),
            photosPerPage: evidenceData[k]?.photosPerPage || 2
          };
        });
        localStorage.setItem(STORAGE_KEY_META, JSON.stringify({
          isInitialized: true,
          schoolName,
          evidenceData: textOnlyEvidence,
          updatedAt: new Date().toISOString()
        }));
      } catch (err) {
        console.error("LocalStorage fallback error:", err);
      }
    }
  }, [schoolName, evidenceData, view, isLoaded]);

  // 初次建立學校總儀表板
  const handleStartDashboard = (e) => {
    e.preventDefault();
    const finalName = schoolName && schoolName.trim() ? schoolName.trim() : "高雄市立OO國小/國中資優評鑑報告";
    setSchoolName(finalName);
    setView('dashboard');
    showToast("已建立學校總儀表板！資料將自動暫存於此瀏覽器。");
  };

  // 匯出全校總備份檔 (.json)
  const exportFullWorkspace = () => {
    try {
      const backupObj = {
        version: "2.0",
        schoolName,
        evidenceData,
        exportedAt: new Date().toISOString()
      };
      const jsonString = JSON.stringify(backupObj, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${schoolName || "資優評鑑報告"}_全校進度備份檔.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("已成功下載全校進度備份檔 (.json)！");
    } catch (err) {
      console.error("Export failed:", err);
      showToast("匯出失敗，請重試。");
    }
  };

  // 匯入全校總備份檔 (.json)
  const handleImportFile = (event) => {
    const fileObj = event.target.files[0];
    if (!fileObj) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.evidenceData || imported.schoolName) {
          const newName = imported.schoolName || schoolName;
          const newEvidence = imported.evidenceData || {};
          setSchoolName(newName);
          setEvidenceData(newEvidence);
          setView('dashboard');
          await saveToIndexedDB({
            isInitialized: true,
            schoolName: newName,
            evidenceData: newEvidence,
            updatedAt: new Date().toISOString()
          });
          showToast("已成功匯入並還原全校評鑑進度！");
        } else {
          showToast("檔案格式不符，請確認是否為本系統匯出之 .json 備份檔。");
        }
      } catch (err) {
        console.error(err);
        showToast("匯入失敗，檔案格式可能損毀。");
      }
    };
    reader.readAsText(fileObj);
    event.target.value = null;
  };

  const toggleDimension = (dimId) => {
    setExpandedDims(prev => ({ ...prev, [dimId]: !prev[dimId] }));
  };

  // 從總儀表板點選單一效標進入編輯專案
  const openCriterionEditor = (critId, defaultTab = 'edit') => {
    if (!evidenceData[critId]) {
      setEvidenceData(prev => ({
        ...prev,
        [critId]: { photos: [], description: "", completed: false, photosPerPage: 2 }
      }));
    }
    setActiveCriterionId(critId);
    setEditorTab(defaultTab);
    setView('criterion_editor');
    window.scrollTo(0, 0);
  };

  // 調整 1：切換效標「標示已完成」狀態
  const toggleCriterionCompleted = (critId, e = null) => {
    if (e) e.stopPropagation();
    setEvidenceData(prev => {
      const current = prev[critId] || { photos: [], description: "", completed: false, photosPerPage: 2 };
      const nextCompleted = !current.completed;
      const code = CRITERIA_MAP[critId]?.shortCode || critId;
      showToast(nextCompleted ? `已將「${code}」標示為已完成！` : `已將「${code}」改回編輯中狀態`);
      return {
        ...prev,
        [critId]: {
          ...current,
          completed: nextCompleted
        }
      };
    });
  };

  // 批次設定該效標所有照片為「一頁一張圖 (1)」或「一頁兩張圖 (2)」，同時作為新增照片的預設值
  const updatePhotosPerPage = (critId, count) => {
    setEvidenceData(prev => {
      const current = prev[critId] || { photos: [], description: "", completed: false, photosPerPage: 2 };
      const updatedPhotos = (current.photos || []).map(p => ({ ...p, perPage: count }));
      return {
        ...prev,
        [critId]: {
          ...current,
          photosPerPage: count,
          photos: updatedPhotos
        }
      };
    });
    showToast(`已將此效標所有照片套用為「一頁 ${count} 圖」（您仍可針對個別照片單獨切換）`);
  };

  // 調整 1：單張照片獨立切換「一頁一圖 (1)」或「一頁兩圖 (2)」
  const updateSinglePhotoPerPage = (critId, photoIndex, count) => {
    setEvidenceData(prev => {
      const current = prev[critId] || { photos: [], description: "", completed: false, photosPerPage: 2 };
      const newPhotos = [...(current.photos || [])];
      if (newPhotos[photoIndex]) {
        newPhotos[photoIndex] = { ...newPhotos[photoIndex], perPage: count };
      }
      return {
        ...prev,
        [critId]: {
          ...current,
          photos: newPhotos
        }
      };
    });
  };

  const confirmClearCriterion = () => {
    if (!clearConfirmCritId) return;
    setEvidenceData(prev => {
      const next = { ...prev };
      delete next[clearConfirmCritId];
      return next;
    });
    setClearConfirmCritId(null);
    showToast("已清空該效標資料");
  };

  const handlePhotoUpload = async (critId, event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;
    const defaultPerPage = evidenceData[critId]?.photosPerPage === 1 ? 1 : 2;
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const resized = await resizeImage(e.target.result);
          resolve({ url: resized, caption: "", perPage: defaultPerPage });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then(newPhotos => {
      setEvidenceData(prev => ({
        ...prev,
        [critId]: {
          ...(prev[critId] || { description: "" }),
          photos: [...(prev[critId]?.photos || []), ...newPhotos]
        }
      }));
      showToast(`已成功加入 ${newPhotos.length} 張佐證照片`);
    });
    event.target.value = null;
  };

  const removePhoto = (critId, photoIndex) => {
    setEvidenceData(prev => {
      const newPhotos = [...(prev[critId]?.photos || [])];
      newPhotos.splice(photoIndex, 1);
      return {
        ...prev,
        [critId]: { ...prev[critId], photos: newPhotos }
      };
    });
  };

  const movePhoto = (critId, index, direction) => {
    setEvidenceData(prev => {
      const photos = [...(prev[critId]?.photos || [])];
      if (direction === 'up' && index > 0) {
        const temp = photos[index];
        photos[index] = photos[index - 1];
        photos[index - 1] = temp;
      } else if (direction === 'down' && index < photos.length - 1) {
        const temp = photos[index];
        photos[index] = photos[index + 1];
        photos[index + 1] = temp;
      }
      return {
        ...prev,
        [critId]: { ...prev[critId], photos: photos }
      };
    });
  };

  const updatePhotoCaption = (critId, photoIndex, caption) => {
    setEvidenceData(prev => {
      const newPhotos = [...(prev[critId]?.photos || [])];
      newPhotos[photoIndex] = { ...newPhotos[photoIndex], caption: caption };
      return {
        ...prev,
        [critId]: { ...prev[critId], photos: newPhotos }
      };
    });
  };

  const updatePhotoSettings = async (critId, photoIndex, action) => {
    if (action === 'rotate') {
      const photo = evidenceData[critId].photos[photoIndex];
      const img = new Image();
      img.src = photo.url;
      await new Promise(r => img.onload = r);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.height;
      canvas.height = img.width;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(90 * Math.PI / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      const newUrl = canvas.toDataURL('image/jpeg', 0.92);

      setEvidenceData(prev => {
        const newPhotos = [...prev[critId].photos];
        newPhotos[photoIndex] = { ...newPhotos[photoIndex], url: newUrl };
        return { ...prev, [critId]: { ...prev[critId], photos: newPhotos } };
      });
    } else if (action === 'zoomIn' || action === 'zoomOut') {
      setEvidenceData(prev => {
        const newPhotos = [...prev[critId].photos];
        const currentScale = newPhotos[photoIndex].scale || 1;
        let newScale = action === 'zoomIn' ? currentScale + 0.1 : currentScale - 0.1;
        if (newScale < 0.5) newScale = 0.5;
        if (newScale > 1.0) newScale = 1.0;
        newPhotos[photoIndex] = { ...newPhotos[photoIndex], scale: newScale };
        return { ...prev, [critId]: { ...prev[critId], photos: newPhotos } };
      });
    } else if (action === 'setMode1' || action === 'setMode2') {
      updateSinglePhotoPerPage(critId, photoIndex, action === 'setMode1' ? 1 : 2);
    }
  };

  const updateDescription = (critId, text) => {
    setEvidenceData(prev => ({
      ...prev,
      [critId]: { ...(prev[critId] || { photos: [], completed: false, photosPerPage: 2 }), description: text }
    }));
  };

  // --- Word 匯出：支援一頁 1 張或一頁 2 張圖，透過 Canvas 預先控制像素高寬，確保單頁圖文完整呈現絕不溢頁或裁切 ---
  const processImageForWord = (photoObj, maxW = 580, maxH = 310) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const scale = photoObj.scale || 1;
        const targetMaxW = Math.floor(maxW * scale);
        const targetMaxH = Math.floor(maxH * scale);

        let w = img.width;
        let h = img.height;
        const ratio = Math.min(targetMaxW / w, targetMaxH / h, 1);
        const finalW = Math.max(1, Math.round(w * ratio));
        const finalH = Math.max(1, Math.round(h * ratio));

        const canvas = document.createElement('canvas');
        canvas.width = finalW;
        canvas.height = finalH;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, finalW, finalH);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, finalW, finalH);

        resolve({
          dataUrl: canvas.toDataURL('image/jpeg', 0.92),
          width: finalW,
          height: finalH
        });
      };
      img.onerror = () => {
        resolve({ dataUrl: photoObj.url, width: 480, height: 270 });
      };
      img.src = photoObj.url;
    });
  };

  const generateDoc = async (criteriaIdsArray = null, customFileName = null) => {
    setIsGeneratingDoc(true);
    try {
      const targetIds = criteriaIdsArray || (activeCriterionId ? [activeCriterionId] : ALL_CRITERIA_IDS);
      const selectedSet = new Set(targetIds);
      const exportTitle = schoolName && schoolName.trim() ? schoolName.trim() : "高雄市立OO國小/國中資優評鑑報告";
      const downloadName = customFileName || exportTitle;

      let bodyContent = `<div class="Section1">`;
      bodyContent += `<div style="text-align:center; border-bottom:3pt solid #111827; padding-bottom:8pt; margin-bottom:16pt;">
        <h1 style="font-size:22pt; font-weight:bold; margin:0; color:#000000;">${exportTitle}</h1>
      </div>`;

      // 壹、文字執行情形區塊
      EVALUATION_DATA.forEach(dim => {
        const hasInds = dim.indicators.some(ind => ind.criteria.some(c => selectedSet.has(c.id)));
        if (!hasInds) return;

        bodyContent += `<div style="background-color:#E5E7EB; border-left:6pt solid #1F2937; padding:6pt 10pt; margin-top:12pt; margin-bottom:10pt;">
          <span style="font-size:15pt; font-weight:bold; color:#000000;">${dim.title}</span>
        </div>`;

        dim.indicators.forEach(ind => {
          const relevantCriteria = ind.criteria.filter(c => selectedSet.has(c.id));
          if (relevantCriteria.length === 0) return;

          relevantCriteria.forEach(crit => {
            const desc = (evidenceData[crit.id]?.description || "（尚無說明文字）").replace(/\n/g, '<br/>');
            bodyContent += `<div style="margin-bottom:14pt; page-break-inside:avoid;">
              <div style="font-size:13pt; font-weight:bold; color:#000000; margin-bottom:6pt;">${crit.title}</div>
              <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse; background-color:#F3F4F6; border-left:4pt solid #4B5563;">
                <tr>
                  <td style="font-size:11.5pt; line-height:1.6; color:#000000;">
                    <b>【執行情形】：</b><br/>${desc}
                  </td>
                </tr>
              </table>
            </div>`;
          });
        });
      });

      // 貳、相關佐證資料區塊 (支援逐圖混排「一頁 1 張」與「一頁 2 張」，嚴格控制像素高寬確保單頁不跨頁、不裁切)
      let isFirstChunk = true;

      for (const dim of EVALUATION_DATA) {
        for (const ind of dim.indicators) {
          for (const crit of ind.criteria) {
            const critEvidence = evidenceData[crit.id] || {};
            const photos = critEvidence.photos || [];
            if (!selectedSet.has(crit.id) || photos.length === 0) continue;

            const fallbackPerPage = critEvidence.photosPerPage === 1 ? 1 : 2;
            const photoPages = groupPhotosIntoPages(photos, fallbackPerPage);

            for (let pageIndex = 0; pageIndex < photoPages.length; pageIndex++) {
              const pageObj = photoPages[pageIndex];
              const chunk = pageObj.items;
              const isOnePerPageMode = pageObj.layoutMode === 1;
              const isSingleItemOnPage = chunk.length === 1;

              // Word 標準分頁符號
              bodyContent += `<br clear="all" style="page-break-before:always; mso-break-type:section-break" />`;

              if (isFirstChunk) {
                bodyContent += `<div style="text-align:center; border-bottom:3pt solid #111827; padding-bottom:6pt; margin-bottom:8pt;">
                  <h1 style="font-size:20pt; font-weight:bold; margin:0; color:#000000;">貳、相關佐證資料</h1>
                </div>`;
              }

              // 嚴格計算該頁每張圖片的最大安全像素高度，確保圖片＋圖說＋標題 100% 容納於單一 A4 頁面內
              let baseMaxImgH;
              if (isOnePerPageMode) {
                baseMaxImgH = isFirstChunk ? 530 : 605;
              } else if (isSingleItemOnPage) {
                baseMaxImgH = isFirstChunk ? 460 : 520;
              } else {
                baseMaxImgH = isFirstChunk ? 245 : 282;
              }
              isFirstChunk = false;

              bodyContent += `<div style="border-bottom:1.5pt solid #6B7280; padding-bottom:3pt; margin-bottom:8pt;">
                <span style="font-size:13pt; font-weight:bold; color:#000000;">
                  ${CRITERIA_MAP[crit.id]?.shortCode || crit.id} 佐證資料 ${pageIndex > 0 ? `(續${pageIndex})` : ''}
                </span>
              </div>`;

              const totalCaptionsLen = chunk.reduce((acc, cur) => acc + (cur.caption ? cur.caption.length : 0), 0);

              for (let i = 0; i < chunk.length; i++) {
                const photo = chunk[i];
                const globalIdx = photo.globalIdx;
                const capLen = (photo.caption || "").length;
                const capPenalty = isSingleItemOnPage
                  ? (capLen > 50 ? Math.min(90, Math.floor((capLen - 50) * 0.6)) : 0)
                  : (totalCaptionsLen > 70 ? Math.min(55, Math.floor((totalCaptionsLen - 70) * 0.3)) : 0);
                const safeMaxH = Math.max(170, baseMaxImgH - capPenalty);

                const processed = await processImageForWord(photo, 600, safeMaxH);
                const captionText = (photo.caption || "（無照片說明）").replace(/\n/g, '<br/>');

                bodyContent += `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; border:1pt solid #D1D5DB; margin-bottom:8pt; page-break-inside:avoid;">
                  <tr>
                    <td align="center" valign="middle" style="background-color:#F9FAFB; padding:5pt; border-bottom:1pt solid #D1D5DB;">
                      <img src="${processed.dataUrl}" width="${processed.width}" height="${processed.height}" style="display:block; margin:0 auto;" />
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#F3F4F6; padding:5pt 9pt; font-size:${(isOnePerPageMode || isSingleItemOnPage) ? '11pt' : '10pt'}; font-weight:bold; color:#000000; line-height:1.35;">
                      圖 ${globalIdx + 1}：${captionText}
                    </td>
                  </tr>
                </table>`;
              }
            }
          }
        }
      }

      bodyContent += `</div>`;

      const wordHtml = `<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${downloadName}</title>
<!--[if gte mso 9]>
<xml>
  <w:WordDocument>
    <w:View>Print</w:View>
    <w:Zoom>100</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument>
</xml>
<![endif]-->
<style>
  @page Section1 {
    size: 210mm 297mm;
    margin: 12mm 12mm 12mm 12mm;
    mso-header-margin: 10mm;
    mso-footer-margin: 10mm;
  }
  div.Section1 { page: Section1; }
  body { font-family: "Microsoft JhengHei", "PMingLiU", sans-serif; color: #000000; margin: 0; padding: 0; }
  table { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  tr { page-break-inside: avoid; }
  img { border: 0; }
</style>
</head>
<body>${bodyContent}</body>
</html>`;

      const blob = new Blob(['\ufeff', wordHtml], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${downloadName}.doc`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("已成功下載 Word 檔 (.doc)！");
    } catch (e) {
      console.error("DOC generation failed", e);
      showToast("Word 檔案生成失敗");
    } finally {
      setIsGeneratingDoc(false);
    }
  };

  const generatePDF = (elementId = 'pdf-content', filenameOverride = null) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    setIsGeneratingPdf(true);

    const exportTitle = schoolName && schoolName.trim() ? schoolName.trim() : "高雄市立OO國小/國中資優評鑑報告";

    const opt = {
      margin: [10, 10, 10, 10],
      filename: filenameOverride || `${exportTitle}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        scrollY: 0,
        letterRendering: true,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    };

    if (window.html2pdf) {
      window.html2pdf().from(element).set(opt).save().then(() => {
        setIsGeneratingPdf(false);
        showToast("已成功下載 PDF 檔 (.pdf)");
      }).catch(err => {
        console.error(err);
        setIsGeneratingPdf(false);
        showToast("PDF 生成發生錯誤，請重試");
      });
    } else {
      showToast("PDF 生成模組尚未載入，請稍後再試。");
      setIsGeneratingPdf(false);
    }
  };
  // 調整 1：計算單一效標狀態（只有當使用者手動點選「標示已完成」時，才視為完成，否則只要有內容皆為編輯中）
  const getCriterionStatus = (critId) => {
    const item = evidenceData[critId];
    const hasDesc = Boolean(item?.description && item.description.trim().length > 0);
    const photos = item?.photos || [];
    const photoCount = photos.length;
    const hasPhoto = photoCount > 0;
    const isCompleted = Boolean(item?.completed);
    const isStarted = hasDesc || hasPhoto || isCompleted;
    const fallbackPerPage = item?.photosPerPage === 1 ? 1 : 2;
    const pageCount = hasPhoto ? groupPhotosIntoPages(photos, fallbackPerPage).length : 0;
    return { hasDesc, hasPhoto, photoCount, pageCount, isComplete: isCompleted, isStarted, photosPerPage: fallbackPerPage };
  };

  // 計算全校 19 項效標總體統計
  const getOverallStats = () => {
    let completedCount = 0;
    let inProgressCount = 0;
    const filledCriteriaIds = [];

    ALL_CRITERIA_IDS.forEach(id => {
      const st = getCriterionStatus(id);
      if (st.isComplete) completedCount++;
      else if (st.isStarted) inProgressCount++;
      if (st.isStarted) filledCriteriaIds.push(id);
    });

    const percent = Math.round((completedCount / ALL_CRITERIA_IDS.length) * 100);
    return {
      total: ALL_CRITERIA_IDS.length,
      completedCount,
      inProgressCount,
      percent,
      filledCriteriaIds
    };
  };

  // --- 畫面 1：第一次進入建立學校總儀表板 ---
  const renderInitialSetup = () => (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-900 overflow-hidden">
        <div className="bg-gray-900 text-white px-8 py-6">
          <span className="inline-block bg-white text-gray-900 text-xs font-extrabold px-3 py-1 rounded-full mb-2">
            STEP 1：初始化學校總儀表板
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            建立您的學校資優評鑑總儀表板
          </h1>
          <p className="text-gray-300 text-sm mt-1.5">
            請直接點選下方欄位修改貴校名稱，建立後即可依四大領域逐一編輯 19 項評鑑效標。
          </p>
        </div>

        <form onSubmit={handleStartDashboard} className="p-8 space-y-6">
          <div>
            <label className="block text-base font-extrabold text-gray-900 mb-2">
              學校／報告名稱（點選下方文字即可直接修改校名）：
            </label>
            <input
              type="text"
              ref={schoolNameInputRef}
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              onFocus={(e) => {
                // 自動選取 "OO" 方便使用者直接打字替換
                const idx = e.target.value.indexOf("OO");
                if (idx !== -1) {
                  e.target.setSelectionRange(idx, idx + 2);
                }
              }}
              className="w-full border-2 border-gray-900 rounded-xl px-4 py-3.5 text-xl font-bold text-gray-900 focus:ring-4 focus:ring-gray-300 outline-none transition bg-gray-50"
              placeholder="高雄市立OO國小/國中資優評鑑報告"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 提示：此名稱將自動套用至所有效標報告頁首及匯出的 Word / PDF 檔案名稱中，進入總儀表板後仍可隨時修改。
            </p>
          </div>

          <div className="bg-gray-100 border-l-4 border-gray-800 p-4 rounded-r-xl text-sm text-gray-800 space-y-1">
            <div className="font-extrabold flex items-center gap-1.5 text-gray-900">
              <AlertTriangle size={16} className="text-gray-900 shrink-0" /> 資安與本地暫存提醒：
            </div>
            <p className="text-xs leading-relaxed text-gray-700">
              本系統考量資安，所有文字與照片僅自動暫存於您的本地瀏覽器中（重新整理頁面不會消失）。若需長期跨日編輯或更換電腦，請善用總儀表板最上方的「匯出」與「匯入」功能！
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto px-5 py-3.5 border-2 border-gray-300 hover:border-gray-900 text-gray-800 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <HardDriveUpload size={18} /> 已有備份檔？點此直接匯入還原
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl font-extrabold text-base shadow-lg transition flex items-center justify-center gap-2"
            >
              進入學校總儀表板 <ChevronRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // --- 畫面 2：學校總儀表板（置頂大字匯出/匯入＋資安提醒＋一二三四大項分類效標清單） ---
  const renderDashboard = () => {
    const stats = getOverallStats();

    return (
      <div className="max-w-6xl mx-auto px-4 py-6 animate-fade-in space-y-6">
        <ClearCriterionModal
          critId={clearConfirmCritId}
          onClose={() => setClearConfirmCritId(null)}
          onConfirm={confirmClearCriterion}
        />

        {/* 最上方設定大字「匯出」、「匯入」功能與資安本地暫存醒目提醒 */}
        <div className="bg-white rounded-2xl border-2 border-gray-900 shadow-md overflow-hidden">
          <div className="bg-gray-900 text-white px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle size={26} className="text-amber-300 shrink-0 mt-0.5" />
              <div>
                <div className="text-base md:text-lg font-extrabold text-white tracking-wide">
                  ⚠️ 本系統考量資安僅暫存於本地瀏覽器，若需長期編輯，請務必下載匯出！
                </div>
                <p className="text-xs md:text-sm text-gray-300 mt-0.5">
                  系統已自動將您的編輯內容暫存於此瀏覽器；但若清除瀏覽器快取或更換電腦，務必點選「匯出」保存備份檔！
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={exportFullWorkspace}
                className="flex-1 sm:flex-initial bg-white hover:bg-gray-100 text-gray-900 font-black text-lg md:text-xl px-6 py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 border-2 border-white"
              >
                <HardDriveDownload size={24} className="text-gray-900" />
                <span>匯出 (下載備份)</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 sm:flex-initial bg-gray-800 hover:bg-gray-700 text-white font-black text-lg md:text-xl px-6 py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 border-2 border-gray-500"
              >
                <HardDriveUpload size={24} />
                <span>匯入 (還原進度)</span>
              </button>
            </div>
          </div>

          {/* 學校報告名稱編輯列 ＆ 總效標完成度統計 */}
          <div className="p-6 bg-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                學校／報告主標題（點擊即可修改校名）
              </div>
              {isEditingSchoolName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    onBlur={() => setIsEditingSchoolName(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingSchoolName(false)}
                    autoFocus
                    className="border-2 border-gray-900 rounded-lg px-3 py-1.5 text-xl md:text-2xl font-extrabold text-gray-900 bg-white w-full max-w-xl outline-none"
                  />
                  <button
                    onClick={() => setIsEditingSchoolName(false)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold shrink-0"
                  >
                    完成
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingSchoolName(true)}
                  className="group inline-flex items-center gap-2.5 cursor-pointer hover:bg-gray-200/70 px-2.5 py-1 -ml-2.5 rounded-lg transition"
                  title="點擊修改學校與報告名稱"
                >
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                    {schoolName || "高雄市立OO國小/國中資優評鑑報告"}
                  </h2>
                  <span className="bg-gray-200 group-hover:bg-gray-900 group-hover:text-white text-gray-700 p-1.5 rounded-lg transition">
                    <Edit3 size={18} />
                  </span>
                </div>
              )}
            </div>

            {/* 進度統計與全校總表預覽按鈕 */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="min-w-[200px]">
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>總效標完成度</span>
                  <span>{stats.completedCount} / {stats.total} 項 ({stats.percent}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${stats.completedCount >= 12 ? 'bg-green-600' : 'bg-gray-900'}`}
                    style={{ width: `${stats.percent}%` }}
                  />
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  已標示完成 {stats.completedCount} 項 ｜ 編輯中 {stats.inProgressCount} 項
                </div>
              </div>

              {stats.filledCriteriaIds.length > 0 && (
                <button
                  onClick={() => setPreviewProjectData({
                    schoolName,
                    titleLabel: `${schoolName}（已填寫之 ${stats.filledCriteriaIds.length} 項效標總覽）`,
                    selectedCriteria: stats.filledCriteriaIds,
                    evidenceData
                  })}
                  className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 shrink-0 shadow-sm transition"
                >
                  <Eye size={16} /> 預覽／匯出已填效標總報告
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 依一、二、三、四大項分類，預設全部收合，點開後顯示各效標專案進度與「標示已完成」按鈕 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <LayoutDashboard size={20} /> 請點選下方四大領域展開，直接點擊任一「效標」進入建立或編輯專案：
            </h3>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setExpandedDims({ dim1: true, dim2: true, dim3: true, dim4: true })}
                className="text-gray-600 hover:text-black underline font-bold"
              >
                全部展開
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setExpandedDims({ dim1: false, dim2: false, dim3: false, dim4: false })}
                className="text-gray-600 hover:text-black underline font-bold"
              >
                全部收合
              </button>
            </div>
          </div>

          {EVALUATION_DATA.map((dim) => {
            let dimTotal = 0;
            let dimDone = 0;
            let dimStarted = 0;
            dim.indicators.forEach(ind => {
              ind.criteria.forEach(crit => {
                dimTotal++;
                const st = getCriterionStatus(crit.id);
                if (st.isComplete) dimDone++;
                else if (st.isStarted) dimStarted++;
              });
            });

            return (
              <div key={dim.id} className="border-2 border-gray-200 rounded-2xl shadow-sm bg-white overflow-hidden">
                {/* 領域標題列 */}
                <button
                  onClick={() => toggleDimension(dim.id)}
                  className="w-full flex items-center justify-between p-5 bg-gray-100 hover:bg-gray-200/80 transition-colors text-left"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-extrabold text-xl text-gray-900">{dim.title}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${dimDone === dimTotal ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-white text-gray-800 border border-gray-300'}`}>
                      已完成：{dimDone} / {dimTotal} 項 {dimStarted > 0 ? `（另有 ${dimStarted} 項編輯中）` : ''}
                    </span>
                  </div>
                  {expandedDims[dim.id] ? <ChevronDown size={24} className="text-gray-700 shrink-0" /> : <ChevronRight size={24} className="text-gray-700 shrink-0" />}
                </button>

                {/* 領域內各指標與效標卡片 */}
                {expandedDims[dim.id] && (
                  <div className="p-5 bg-white border-t border-gray-200 space-y-6">
                    {dim.indicators.map((ind) => (
                      <div key={ind.id} className="space-y-3">
                        <h4 className="font-bold text-base text-gray-900 pl-3 border-l-4 border-gray-800 bg-gray-50 py-1.5 pr-3 rounded-r">
                          {ind.title}
                        </h4>

                        <div className="grid grid-cols-1 gap-3 pl-2">
                          {ind.criteria.map((crit) => {
                            const st = getCriterionStatus(crit.id);
                            const shortCode = CRITERIA_MAP[crit.id]?.shortCode || crit.id;

                            return (
                              <div
                                key={crit.id}
                                onClick={() => openCriterionEditor(crit.id, 'edit')}
                                className={`group rounded-xl p-4 border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                                  st.isComplete
                                    ? 'bg-green-50/40 border-green-500 hover:border-green-600 shadow-sm'
                                    : st.isStarted
                                    ? 'bg-amber-50/30 border-gray-500 hover:border-gray-900 shadow-sm'
                                    : 'bg-white border-gray-200 hover:border-gray-800 hover:bg-gray-50/60'
                                }`}
                              >
                                <div className="space-y-2">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className={`text-xs font-extrabold px-2.5 py-1 rounded ${
                                      st.isComplete ? 'bg-green-700 text-white' : st.isStarted ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
                                    }`}>
                                      {shortCode}
                                    </span>

                                    {/* 專案整體狀態標籤 */}
                                    {st.isComplete ? (
                                      <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-green-100 text-green-800 border border-green-300 flex items-center gap-1">
                                        <CheckCircle size={13} /> 已完成
                                      </span>
                                    ) : st.isStarted ? (
                                      <span className="px-2.5 py-0.5 rounded text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                                        ✎ 編輯中（尚未標示完成）
                                      </span>
                                    ) : (
                                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
                                        尚未開始
                                      </span>
                                    )}

                                    {/* 細部內容狀態標籤 */}
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${st.hasDesc ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500 border border-gray-300'}`}>
                                      {st.hasDesc ? '✓ 已填執行說明' : '○ 尚無說明'}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${st.hasPhoto ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-500 border border-gray-300'}`}>
                                      {st.hasPhoto ? `✓ 已傳 ${st.photoCount} 張佐證照（共排 ${st.pageCount} 頁）` : '○ 尚無照片'}
                                    </span>
                                  </div>

                                  <div className="font-bold text-gray-900 text-base leading-relaxed">
                                    {crit.title}
                                  </div>

                                  {/* 檢核資料提示 */}
                                  {crit.checklists && crit.checklists.length > 0 && (
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-600">
                                      <span className="font-bold text-gray-800">📋 應檢附檢核資料參考：</span>
                                      <ul className="list-disc list-inside mt-0.5 space-y-0.5">
                                        {crit.checklists.map((chk, idx) => (
                                          <li key={idx}>{chk}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>

                                {/* 每個效標下方的操作按鈕列（新增「標示已完成」按鈕） */}
                                <div className="pt-3 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-2">
                                  <button
                                    type="button"
                                    onClick={(e) => toggleCriterionCompleted(crit.id, e)}
                                    className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold flex items-center gap-1.5 border-2 transition ${
                                      st.isComplete
                                        ? 'bg-green-600 hover:bg-green-700 text-white border-green-600 shadow-sm'
                                        : 'bg-white hover:bg-green-50 text-gray-800 hover:text-green-800 border-gray-300 hover:border-green-500'
                                    }`}
                                  >
                                    <Check size={16} className={st.isComplete ? 'text-white' : 'text-gray-400'} />
                                    <span>{st.isComplete ? '已標示完成（點擊改回編輯中）' : '標示已完成'}</span>
                                  </button>

                                  <div className="flex items-center gap-2">
                                    {st.isStarted && (
                                      <>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setPreviewProjectData({
                                              schoolName,
                                              titleLabel: `${schoolName} - ${shortCode}`,
                                              selectedCriteria: [crit.id],
                                              evidenceData
                                            });
                                          }}
                                          className="px-3 py-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                                          title="預覽並匯出此單一效標之 Word / PDF"
                                        >
                                          <Eye size={15} /> 預覽匯出
                                        </button>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setClearConfirmCritId(crit.id);
                                          }}
                                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                          title="清空此效標內容"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </>
                                    )}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openCriterionEditor(crit.id, 'edit');
                                      }}
                                      className="px-4 py-2 bg-gray-900 group-hover:bg-black text-white rounded-lg text-xs md:text-sm font-bold flex items-center gap-1.5 shadow-sm transition"
                                    >
                                      <FolderOpen size={15} />
                                      <span>{st.isStarted ? '繼續編輯專案' : '點選建立專案'}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // --- 畫面 3：單一效標專案編輯與即時預覽匯出 ---
  const renderCriterionEditor = () => {
    const critInfo = CRITERIA_MAP[activeCriterionId];
    if (!critInfo) return null;

    const currentItem = evidenceData[activeCriterionId] || {};
    const currentPhotos = currentItem.photos || [];
    const currentDesc = currentItem.description || "";
    const isCompleted = Boolean(currentItem.completed);
    const photosPerPage = currentItem.photosPerPage === 1 ? 1 : 2;

    // 預先計算每張照片實際所在的佐證頁碼，方便使用者在編輯列表即時查看混排分頁結果
    const groupedPages = groupPhotosIntoPages(currentPhotos, photosPerPage);
    const photoPageMap = {};
    groupedPages.forEach((pObj, pIdx) => {
      pObj.items.forEach(it => {
        photoPageMap[it.globalIdx] = {
          pageNum: pIdx + 1,
          countOnPage: pObj.items.length,
          mode: it.mode
        };
      });
    });

    const singleProjectData = {
      schoolName,
      selectedCriteria: [activeCriterionId],
      evidenceData
    };
    const filePrefix = `${schoolName || "資優評鑑報告"}_${critInfo.shortCode.replace(/\s+/g, '')}`;

    return (
      <div className="max-w-6xl mx-auto px-4 py-6 animate-fade-in space-y-6">
        {/* 頂部切換列 */}
        <div className="bg-white p-4 rounded-xl border-2 border-gray-900 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView('dashboard')}
              className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-bold text-sm flex items-center gap-1.5 transition shrink-0"
            >
              <ArrowLeft size={18} /> 返回總儀表板
            </button>
            <div>
              <span className="text-xs font-bold text-gray-500">{critInfo.dimTitle} ｜ {critInfo.indTitle}</span>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-extrabold text-gray-900">{critInfo.shortCode} 專案編輯</h2>
                <span className={`text-xs font-extrabold px-2 py-0.5 rounded ${isCompleted ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-amber-100 text-amber-900 border border-amber-300'}`}>
                  {isCompleted ? '✓ 已標示完成' : '✎ 編輯中'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-end lg:self-center">
            <button
              onClick={() => toggleCriterionCompleted(activeCriterionId)}
              className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-extrabold flex items-center gap-1.5 border-2 transition ${
                isCompleted
                  ? 'bg-green-600 hover:bg-green-700 text-white border-green-600'
                  : 'bg-white hover:bg-green-50 text-gray-800 border-gray-300 hover:border-green-600'
              }`}
            >
              <Check size={16} />
              <span>{isCompleted ? '已完成（點擊改回編輯中）' : '標示已完成'}</span>
            </button>

            <button
              onClick={() => setEditorTab('edit')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition ${editorTab === 'edit' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              1. 填寫說明與上傳照片
            </button>
            <button
              onClick={() => setEditorTab('preview')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-1.5 ${editorTab === 'preview' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <Eye size={16} /> 2. 預覽與下載 Word / PDF
            </button>
          </div>
        </div>

        {editorTab === 'edit' ? (
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-5 bg-gray-900 text-white">
              <h3 className="font-bold text-lg md:text-xl leading-snug">{critInfo.title}</h3>
            </div>

            {/* 自評表官方檢核資料提示 */}
            {critInfo.checklists && critInfo.checklists.length > 0 && (
              <div className="bg-gray-100 px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                <div className="font-extrabold text-gray-900 flex items-center gap-1.5 mb-1.5">
                  <Info size={16} className="text-gray-900 shrink-0" />
                  <span>自評表檢核資料參考（建議於下方執行情形說明或佐證照片中呈現）：</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1 text-gray-700 font-medium">
                  {critInfo.checklists.map((chk, idx) => (
                    <li key={idx}>{chk}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左欄：執行情形說明 */}
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-base font-extrabold text-gray-900">
                    壹、綜合執行情形說明
                  </label>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${currentDesc.trim() ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {currentDesc.trim() ? `已輸入 ${currentDesc.trim().length} 字` : '尚未填寫'}
                  </span>
                </div>
                <textarea
                  className="flex-1 w-full border-2 border-gray-300 rounded-xl p-4 text-base focus:ring-2 focus:ring-gray-900 focus:border-gray-900 min-h-[300px] leading-relaxed outline-none"
                  placeholder="請參考上方「檢核資料參考」，輸入本校具體執行情形、會議決策或課程調整成效..."
                  value={currentDesc}
                  onChange={(e) => updateDescription(activeCriterionId, e.target.value)}
                />
              </div>

              {/* 右欄：佐證照片集與逐圖排版模式選擇 */}
              <div className="space-y-4">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <label className="block text-base font-extrabold text-gray-900">
                    貳、佐證照片集（共 {currentPhotos.length} 張，排為 {groupedPages.length} 頁）
                  </label>
                  <label className="flex items-center text-sm font-bold text-white bg-gray-900 hover:bg-black px-4 py-2.5 rounded-xl cursor-pointer transition-colors shadow-sm">
                    <Camera size={18} className="mr-2" /> 新增佐證照片
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handlePhotoUpload(activeCriterionId, e)} />
                  </label>
                </div>

                {/* 批次快速套用列 ＋ 支援逐圖單獨切換說明 */}
                <div className="bg-gray-100 p-3.5 rounded-xl border border-gray-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-extrabold text-gray-900">
                      📐 支援「逐圖獨立選擇」一頁一圖或一頁兩圖混排！
                    </div>
                    <div className="text-[11px] text-gray-600 mt-0.5">
                      您可在下方每張照片旁單獨切換排版；或點選右側按鈕一鍵批次套用：
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => updatePhotosPerPage(activeCriterionId, 1)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1 bg-white hover:bg-gray-900 text-gray-800 hover:text-white border border-gray-300 transition shadow-sm"
                    >
                      <Square size={13} /> 全部設為一頁一圖
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePhotosPerPage(activeCriterionId, 2)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1 bg-white hover:bg-gray-900 text-gray-800 hover:text-white border border-gray-300 transition shadow-sm"
                    >
                      <LayoutGrid size={13} /> 全部設為一頁兩圖
                    </button>
                  </div>
                </div>

                {currentPhotos.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400 bg-gray-50 h-[240px] flex items-center justify-center">
                    <div>
                      <p className="mb-1 font-bold text-gray-600">尚未上傳佐證照片或文件截圖</p>
                      <p className="text-xs text-gray-500">可上傳會議紀錄、簽到表、課程計畫、IGP 紀錄或活動照片</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                    {currentPhotos.map((photoObj, idx) => {
                      const pageMeta = photoPageMap[idx] || { pageNum: 1, mode: 2 };
                      const thisMode = pageMeta.mode;

                      return (
                        <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-300 relative group shadow-sm">
                          <div className="flex gap-3.5 items-start">
                            <div className="w-24 h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-300">
                              <img src={photoObj.url} alt="evidence" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="mb-1.5 flex flex-wrap justify-between items-center gap-2">
                                <label className="text-xs font-extrabold text-gray-900">
                                  圖 {idx + 1}（排在佐證第 {pageMeta.pageNum} 頁）
                                </label>

                                {/* 單張照片專屬「一頁一圖 / 一頁兩圖」切換器 */}
                                <div className="inline-flex rounded-lg border border-gray-300 bg-white p-0.5 shadow-sm">
                                  <button
                                    type="button"
                                    onClick={() => updateSinglePhotoPerPage(activeCriterionId, idx, 1)}
                                    className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold flex items-center gap-1 transition ${
                                      thisMode === 1
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                    title="此圖獨立占滿一頁（適合直式公文、簽呈、表格）"
                                  >
                                    <Square size={11} /> 一頁一圖
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => updateSinglePhotoPerPage(activeCriterionId, idx, 2)}
                                    className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold flex items-center gap-1 transition ${
                                      thisMode === 2
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                    title="與相鄰的一頁兩圖照片上下並排於同一頁（適合橫式活動照）"
                                  >
                                    <LayoutGrid size={11} /> 一頁兩圖
                                  </button>
                                </div>
                              </div>
                              <textarea
                                rows={2}
                                value={photoObj.caption}
                                onChange={(e) => updatePhotoCaption(activeCriterionId, idx, e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none bg-white"
                                placeholder="請輸入此張佐證照片之具體圖說..."
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <button onClick={() => removePhoto(activeCriterionId, idx)} className="text-gray-400 hover:text-red-600 transition-colors p-1" title="刪除"><Trash2 size={18} /></button>
                              <button
                                onClick={() => movePhoto(activeCriterionId, idx, 'up')}
                                disabled={idx === 0}
                                className={`p-1 rounded hover:bg-gray-200 ${idx === 0 ? 'text-gray-300' : 'text-gray-700'}`}
                                title="上移"
                              >
                                <ArrowUp size={16} />
                              </button>
                              <button
                                onClick={() => movePhoto(activeCriterionId, idx, 'down')}
                                disabled={idx === currentPhotos.length - 1}
                                className={`p-1 rounded hover:bg-gray-200 ${idx === currentPhotos.length - 1 ? 'text-gray-300' : 'text-gray-700'}`}
                                title="下移"
                              >
                                <ArrowDown size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
              <span className="text-xs text-gray-600 font-medium flex items-center gap-1.5">
                <CheckCircle size={15} className="text-green-600" /> 您輸入的文字與照片已即時暫存於本地瀏覽器中
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => toggleCriterionCompleted(activeCriterionId)}
                  className={`px-5 py-2.5 rounded-xl font-extrabold text-sm flex items-center gap-1.5 border-2 transition ${
                    isCompleted
                      ? 'bg-green-600 hover:bg-green-700 text-white border-green-600'
                      : 'bg-white hover:bg-green-50 text-gray-800 border-gray-300 hover:border-green-600'
                  }`}
                >
                  <Check size={16} />
                  <span>{isCompleted ? '已標示完成' : '標示已完成'}</span>
                </button>
                <button
                  onClick={() => setView('dashboard')}
                  className="px-5 py-2.5 border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 rounded-xl font-bold text-sm transition"
                >
                  返回總儀表板
                </button>
                <button
                  onClick={() => {
                    setEditorTab('preview');
                    window.scrollTo(0, 0);
                  }}
                  className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm shadow transition flex items-center gap-1.5"
                >
                  <Eye size={16} /> 預覽排版與下載 Word / PDF
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-[210mm] bg-gray-100 p-4 rounded-xl border border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-900 text-xs md:text-sm font-bold">
                  💡 滑鼠移至預覽圖片右上角，可針對「單張圖片」切換【一頁一圖 / 一頁兩圖】、縮放或旋轉；或點此批次套用：
                </span>
                <button
                  onClick={() => updatePhotosPerPage(activeCriterionId, 1)}
                  className="px-2.5 py-1 rounded-lg text-xs font-extrabold border bg-white hover:bg-gray-900 text-gray-800 hover:text-white border-gray-300 transition"
                >
                  全設一頁一圖
                </button>
                <button
                  onClick={() => updatePhotosPerPage(activeCriterionId, 2)}
                  className="px-2.5 py-1 rounded-lg text-xs font-extrabold border bg-white hover:bg-gray-900 text-gray-800 hover:text-white border-gray-300 transition"
                >
                  全設一頁兩圖
                </button>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => generateDoc([activeCriterionId], filePrefix)}
                  disabled={isGeneratingDoc}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-bold text-xs md:text-sm flex items-center gap-1.5 shadow"
                >
                  {isGeneratingDoc ? <Loader2 className="animate-spin" size={16} /> : <FileText size={16} />}
                  下載此效標 Word (.doc)
                </button>
                <button
                  onClick={() => generatePDF('pdf-content', `${filePrefix}.pdf`)}
                  disabled={isGeneratingPdf}
                  className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold text-xs md:text-sm flex items-center gap-1.5 shadow"
                >
                  {isGeneratingPdf ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
                  下載此效標 PDF (.pdf)
                </button>
              </div>
            </div>

            <div id="pdf-content" className="w-full">
              <ReportContent
                projectData={singleProjectData}
                isInteractive={true}
                onUpdatePhotoSettings={updatePhotoSettings}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-20 relative">
      <input type="file" ref={fileInputRef} onChange={handleImportFile} accept=".json" className="hidden" />

      {/* 系統通知 Toast */}
      {toastMsg && (
        <div className="fixed top-24 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-gray-700 flex items-center gap-2.5 animate-fade-in">
          <CheckCircle size={18} className="text-green-400 shrink-0" />
          <span className="text-sm font-bold">{toastMsg}</span>
        </div>
      )}

      {/* 彈出式預覽視窗 */}
      <PreviewModal
        projectData={previewProjectData}
        onClose={() => setPreviewProjectData(null)}
        onGeneratePDF={() => generatePDF('preview-modal-content', `${previewProjectData?.titleLabel || schoolName}.pdf`)}
        onGenerateDoc={() => generateDoc(previewProjectData?.selectedCriteria, previewProjectData?.titleLabel || schoolName)}
        isGeneratingPdf={isGeneratingPdf}
        isGeneratingDoc={isGeneratingDoc}
      />

      {/* 頂部導覽列 (已移除黑白灰標示與複製指令到 Gemini 按鈕) */}
      <header className="bg-white shadow-sm sticky top-0 z-20 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setView(view === 'setup' ? 'setup' : 'dashboard')}
          >
            <div className="bg-gray-900 text-white p-2 rounded-xl shadow-sm"><Cloud size={22} /></div>
            <div>
              <span className="font-extrabold text-lg md:text-xl text-gray-900 tracking-tight block leading-none">
                特教評鑑（資優類）總儀表板排版系統
              </span>
              <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
                本地瀏覽器自動暫存
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {view !== 'setup' && (
              <button
                onClick={() => setView('dashboard')}
                className="text-gray-700 hover:text-black px-3 py-1.5 rounded-lg hover:bg-gray-100 text-xs md:text-sm font-bold flex items-center gap-1 transition"
              >
                <Home size={16} /> 總儀表板
              </button>
            )}
          </div>
        </div>
      </header>

      <main>
        {!isLoaded ? (
          <div className="flex justify-center py-24"><Loader2 className="animate-spin text-gray-800" size={44} /></div>
        ) : view === 'setup' ? (
          renderInitialSetup()
        ) : view === 'criterion_editor' ? (
          renderCriterionEditor()
        ) : (
          renderDashboard()
        )}
      </main>
    </div>
  );
}