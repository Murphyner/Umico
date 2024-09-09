import api from "../_services/api";

const url = new URLSearchParams(window.location.search)
const id = url.get("params")
const productItemContent = document.getElementById('product-item-content')
const productAbout = document.getElementById('product-about')

let productitem = []
let item = []
let abt = []

async function getProductsItem(){
    const data = await api.getProductData()
    data.map(item => productitem.push(...item.products))
    item = productitem.filter(item => item.id == id)
    item.map(element => {
        abt.push(...element.custom_fields)
        productItemContent ? productItemContent.innerHTML += `
                                        <div class="lg:size-5/12 mb-5 size-full">
                                            <div>
                                                <div class="flex items-center">
                                                    <img class="w-[200px] h-[200px] lg:mx-0 mx-auto" src="${element.img_url_original}" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="size-full mb-5 lg:size-7/12">
                                            <div class="text-center lg:text-left">
                                                <h2 class="font-bold mb-5 text-[16px] lg:text-[24px]">${element.name}</h2>
                                                <div class="mb-5">
                                                    <img src="../img/720_24161.webp" /> 
                                                </div>
                                                <div class="mb-5">
                                                    <span class="inline-block mr-2 text-[#ff4b81] text-[24px] font-bold">${element.retail_price} ₼</span>
                                                    <span class="text-[#9497ad] ${element.old_price == 0 ? 'hidden' : ''} text-[16px] font-bold line-through">${element.old_price} ₼</span>
                                                </div>
                                                <div class="flex mb-5 justify-center lg:justify-start items-center">
                                                    <img src="../img/icon-installment.webp" />
                                                    <span class="bg-[#ffd740] inline-block mr-2 rounded-sm font-semibold py-[2px] px-2 text-[13px] lg:text-[16px]">Taksitli ödəniş</span>
                                                    <p class="text-[16px]">${(element.retail_price / 3).toFixed(2)} ₼ X 3 ay</p>
                                                </div>
                                                <div>
                                                    <button onclick="addBasketArr(${element.id})" class="text-[16px] font-bold bg-[#7c62e3] text-white rounded-sm p-3">Səbətə əlavə etmək</button>
                                                </div>
                                            </div>
                                        </div>
                                        ` : ''
    })
    abt.map((item, j) => {
        productAbout.innerHTML +=   `<div class="flex p-2 mb-2 ${j % 2 ? '' : 'bg-[#F6F7F8]'} items-center justify-between">
                                        <p class="font-semibold mr-1 size-5/12 text-[14px] md:text-[16px] lg:text-[18px]">${item.name}</p>
                                        <p class="font-semibold size-7/12  text-[14px] md:text-[16px] lg:text-[18px]">${item.values.map(i => `<span> ${i}</span>`) }</p>
                                    </div>`
    })
}
getProductsItem()