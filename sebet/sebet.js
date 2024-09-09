import api from "../_services/api";

const sebetDeyisen = document.getElementById('sebet-deyisen');
const sebetLength = document.getElementById('sebet-length');
const sebetContent = document.getElementById('sebet-content');
const butunMehsullarCemi = document.getElementById('butun-mehsullar-cemi');
const butunMehsullarEndirim = document.getElementById('butun-mehsullar-endirim');
const mehsullarCem = document.getElementById('mehsullar-cem');

let arr1 = [];
let countArr = []

const existingBasket = localStorage.getItem("Sebet");
if (existingBasket) {
    arr1 = JSON.parse(existingBasket);
    if (arr1.length) {
        sebetDeyisen ? sebetDeyisen.innerHTML = arr1.length : " "
        showSebetContent(arr1)
        if (sebetLength) {
            sebetLength.innerHTML = arr1.length;
            sebetLength.style.display = "flex";
        }
    } else {
        if (sebetLength) {
            sebetLength.style.display = "none";
        }
    }
}

window.countArt = countArt
window.handleDelete = handleDelete

function showSebetContent(element) {
    let btncem = 0
    let btnend = 0
    if (sebetContent) {
        sebetContent.innerHTML = '';
        element.forEach(item => {
            item.count ? "" : item.count = 1
            btncem += (item.retail_price * item.count)
            btnend += (item.old_price != 0 ? ((item.old_price - item.retail_price) * item.count) : 0)
        });
        butunMehsullarEndirim.innerHTML = ((-btnend).toFixed(2) + " ₼")
        butunMehsullarCemi.innerHTML = (btncem).toFixed(2) + " ₼"
        mehsullarCem.innerHTML = (btncem - btnend).toFixed(2) + " ₼"
        if (element.length === 0) {
            butunMehsullarEndirim.innerHTML = "0.00 ₼";
            butunMehsullarCemi.innerHTML = "0.00 ₼";
            mehsullarCem.innerHTML = "0.00 ₼";
        } else {
            element.forEach(item => {
                sebetContent.innerHTML += showSebetCard(item)
            });
        }
    }
}

function showSebetCard(item) {
    return `<div class="bg-white mb-5">
                <div class="border-b px-10 py-3">Satıcı şirkət: ${item.default_marketing_name.name}</div>
                <div class="px-10 py-3">
                    <div class="flex flex-wrap pt-10 justify-between relative">
                        <button onclick="handleDelete(${item.id})" class="absolute top-[-10px] right-[0px] text-[1.2em] text-[#9497ad]">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="flex w-full xl:size-6/12">
                            <div class="w-5/12 h-[200px] mr-6 overflow-hidden">
                                <img class="w-full object-cover" src="${item.img_url_thumbnail ? item.img_url_thumbnail : item.img_url_original}" />
                            </div>
                            <div>
                                <p class="text-white mb-1 ${item.discount != 0 ? '' : 'hidden'} bg-[#ff4b81] text-center max-w-[35px] rounded-sm text-[11px] font-bold py-[2px] px-[4px]">-${(item.discount).toFixed(0)}%</p>
                                <p class="max-w-[376px] mb-2 text-[13px] font-normal">${item.name}</p>
                                <span class="text-[#ff4b81] text-[16px] mr-1 font-bold">${item.retail_price} ₼</span>
                                <span class="text-[#9497ad] ${item.old_price ? '' : 'hidden'} text-[13px] line-through font-bold">${item.old_price} ₼</span>
                                <div class="flex my-3">
                                    <div class="bg-[#ffd740] text-[13px] mr-1 font-semibold whitespace-nowrap p-1 rounded-sm">Taksitli ödəniş</div>
                                    <div class="bg-[#ffd740] text-[13px] font-semibold whitespace-nowrap p-1 rounded-sm">${(item.retail_price / 3).toFixed(2)} ₼ x 3ay</div>
                                </div>
                            </div>
                        </div>
                        <div class="mr-10 w-full xl:size-5/12">
                            <div class="flex justify-end">
                                <button onclick="countArt(${item.id}, -1)" class="border border-black px-3 py-1">-</button>
                                <span class="border border-black px-3 py-1">${item.count}</span>
                                <button onclick="countArt(${item.id}, 1)" class="border border-black px-3 py-1">+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="border-t px-10 py-3">
                    <div class="flex lg:justify-end">
                        <div class="flex w-full lg:w-auto flex-col">
                            <p class="mb-2 flex justify-between items-center text-[13px]"><span>Endirim:</span> <span class="text-[#ff4b81]">${item.old_price != 0 ? (-(item.old_price - item.retail_price) * item.count).toFixed(2) : '0.00'} ₼</span></p>
                            <p class="text-[13px] flex justify-between items-center"><span>Ümumi qiymət:</span> <span class="text-[16px] block ml-[24px] font-bold">${(item.retail_price * item.count).toFixed(2)} ₼</span></p>
                        </div>
                    </div>
                </div> 
            </div>`;
}

async function addBasketArr(id) {
    try {
        let kod1 = [];
        let kod2 = [];

        const [data] = await Promise.all([api.getProductData()]);

        data.forEach(item => kod1.push(...item.products));
        kod1 = kod1.filter(item => item.id == id);

        const newProduct = kod1.length ? kod1[0] : kod2.length ? kod2[0] : null;
        
        if (newProduct) {
            const existingProductIndex = arr1.findIndex(item => item.id == id);
            if (existingProductIndex !== -1) {
                arr1[existingProductIndex].count += 1;
                showToast(`Məhsulun sayı artırıldı(${arr1[existingProductIndex].count}): ${newProduct.name}`);
            } else {
                newProduct.count = 1;
                arr1.push(newProduct);
                showToast(`Məhsul səbətə əlavə olundu: ${newProduct.name}`);
            }
        }

        if (arr1.length) {
            sebetLength.innerHTML = arr1.length;
            sebetLength.style.display = "flex";
        }

        const sebetString = JSON.stringify(arr1);
        localStorage.setItem("Sebet", sebetString);

        showSebetContent(arr1);
    } catch (error) {
        console.error("Data alınarkən xəta var:", error);
        showToast("Bir xəta baş verdi. Yenidən cəhd edin.");
    }
}

function countArt(x, y) {
    sebetContent.innerHTML = '';
    countArr = arr1.filter(item => item.id == x);
    countArr.map(item => {
        item.count += y;
        if (item.count < 1) item.count = 1;
    });

    localStorage.setItem("Sebet", JSON.stringify(arr1));

    showSebetContent(arr1);
}

function handleDelete(id) {

    sebetContent.innerHTML = '';
    arr1 = arr1.filter(item => item.id != id);

    localStorage.setItem("Sebet", JSON.stringify(arr1));
    if (arr1.length) {
        sebetDeyisen ? sebetDeyisen.innerHTML = arr1.length : " "
        if (sebetLength) {
            sebetLength.innerHTML = arr1.length;
            sebetLength.style.display = "flex";
        }
    } else {
        sebetDeyisen ? sebetDeyisen.innerHTML = 0 : " "
        if (sebetLength) {
            sebetLength.style.display = "none";
        }
    }

    showSebetContent(arr1);
}

export { addBasketArr };

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerHTML = message;
    toast.className = "toast show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}
