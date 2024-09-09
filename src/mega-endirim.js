import api from "../_services/api";
import { addBasketArr } from "../sebet/sebet";

const megaEndirimCnt = document.getElementById('mega-endirim-cnt')
let arr = []

window.addBasketArr = addBasketArr

async function getMegaData() {
    let data = await api.getProductData()
    data.map(item => {
        arr.push(...item.products)
        arr = arr.filter(item => item.old_price != 0 && item.old_price > 250)
        arr.sort((a, b) => (a.retail_price - a.old_price) - (b.retail_price - a.old_price))
    })
    arr = arr.slice(0, 20)
    arr.map(item => {
        megaEndirimCnt ? megaEndirimCnt.innerHTML += `<div class="2xl:mb-2 swiper-slide xl:mb-4 mb-2 size-6/12 lg:size-4/12 xl:size-3/12 2xl:w-[20%] px-1 2xl:px-1 xl:px-2 relative">
                                        <div class="bg-white overflow-hidden">
                                            <button class="absolute top-[15px] right-[20px] z-[10]"><i class="far fa-heart"></i></button>
                                                <div class="relative sm:h-[186px] h-[124px] mb-2 bg-white flex justify-center p-5 pt-8">
                                                    <a href="/product/?params=${item.id}" > 
                                                        <img class="h-full mx-auto" src="${item.img_url_original}" /> 
                                                    </a>
                                                    <span class="absolute bottom-[15px] left-[15px] px-1 text-[11px] ${item.discount == 0 ? 'hidden' : ''} font-bold text-white bg-[#F81A5D]"> -${(item.discount).toFixed(0)}%</span>
                                                </div>
                                                <div class="px-[15px] ">
                                                    <div class="mb-2">
                                                        <span class="text-[#f81a5d] font-bold mr-1 text-[16px]">${(item.retail_price).toFixed(2)}</span>
                                                        <span class="line-through ${item.old_price == 0 ? 'hidden' : ''} text-[13px] font-bold text-[#9497ad]">${(item.old_price).toFixed(2)}</span>
                                                    </div>
                                                    <div class="mb-2">
                                                        <p class="text-[13px] h-[40px] overflow-hidden font-normal">${item.name}</p>
                                                    </div>
                                                    <div class="mb-2">
                                                        <p class="text-[#9497ad] text-[11px]">Satıcı: <span class="ml-[2px] text-[#1e244d]">${item.marketing_name.name}</span></p>
                                                    </div>
                                                    <div class="border-t py-3">
                                                        <button onclick="addBasketArr(${item.id})" class="text-[#7c62e3] text-[12px] flex items-center font-bold">
                                                            <i class="fas fa-shopping-cart text-[20px] mr-2"></i>
                                                            <span>SƏBƏTƏ AT</span>
                                                        </button>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>` : ''
    })
}

export { getMegaData }