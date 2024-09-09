import api from "../_services/api";

const aktualShow = document.getElementById('aktual-show')


async function showActual(){
    let data = await api.getActualCategory()
    data.map(item => {
        aktualShow ?  aktualShow.innerHTML += `<div class="size-6/12 md:size-4/12 lg:size-2/12 px-3 mb-8">
                                    <div>
                                        <div class="h-[160px] flex items-center">
                                            <img class="w-[138px] mx-auto max-h-[138px]" src="${item.icons.original}" />
                                        </div>
                                        <div>
                                            <p class="text-center">${item.name}</p>
                                        </div>
                                    </div>
                                </div>` : ''
    })
}

export { showActual }