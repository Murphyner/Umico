import api from "../_services/api"
import { addBasketArr } from "../sebet/sebet"

const slideSkitkaContainer = document.getElementById('slide-skitka-container')

/*----------------------Gundelik Endirimler--------------------------*/ 

window.addBasketArr = addBasketArr

async function ShowEndirimSlide() {
    let data = await api.getProductData()
    data = data[0].products
    data.sort((a, b) => b.discount - a.discount)
    data = data.slice(0, 10)
    let EndirimKod = ''
    data.map(item => {
        EndirimKod += `
                        <div id="endirim${item.id}" class="swiper-slide bg-white relative">
                            <button class="absolute top-[15px] right-[15px] z-[10]"><i class="far fa-heart"></i></button>
                                <div class="relative sm:h-[186px] h-[124px] mb-2 bg-white flex justify-center p-5 pt-8">
                                    <a href="/product/?params=${item.id}" > 
                                        <img class="h-full mx-auto" src="${item.img_url_original}" /> 
                                    </a>
                                    <span class="absolute top-[15px] left-[15px] text-[13px] px-1 font-semibold text-white bg-[#F81A5D]">${item.product ?  item.product_labels[0].name : ""}</span>
                                    <span class="absolute bottom-[15px] left-[15px] px-1 text-[11px] font-bold text-white bg-[#F81A5D]">-${(item.discount).toFixed(0)}%</span>
                                </div>
                                <div class="px-[15px] ">
                                    <div class="mb-2">
                                        <span class="text-[#f81a5d] font-bold mr-1 text-[16px]">${(item.retail_price).toFixed(2)}</span>
                                        <span class="line-through text-[13px] font-bold text-[#9497ad]">${(item.old_price).toFixed(2)}</span>
                                    </div>
                                    <div class="inline-block mb-2 px-1 bg-[#FFD740]">
                                        <span class="text-[13px] font-bold">${(item.retail_price / 3).toFixed(2)} ₼ X 3 ay</span>
                                    </div>
                                    <div class="mb-2">
                                        <p class="text-[13px] h-[40px] overflow-hidden font-normal">${item.name}</p>
                                    </div>
                                    <div class="mb-2">
                                        <p class="text-[#9497ad] text-[11px]">Satıcı: <span class="ml-[2px] text-[#1e244d]">${item.default_marketing_name.name}</span></p>
                                    </div>
                                    <div class="border-t py-3">
                                        <button onclick="addBasketArr(${item.id})" class="text-[#7c62e3] text-[12px] flex items-center font-bold">
                                            <i class="fas fa-shopping-cart text-[20px] mr-2"></i>
                                            <span>SƏBƏTƏ AT</span>
                                        </button>
                                    </div>
                                </div>
                        </div>
                        `
    })
    slideSkitkaContainer ? slideSkitkaContainer.innerHTML = EndirimKod : ''
}

export { ShowEndirimSlide }