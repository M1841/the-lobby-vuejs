app.component('app-footer', {
    props: {
        theme: {
            type: Object,
            required: true
        }
    },
    template:
    /* html */
    `   <div class="container-fluid rounded px-3 py-3 w-100 mb-3 text-center" :class="'bg-' + theme.c1" unselectable="on" onselectstart="return false;" onmousedown="return false;" style="cursor: default;">
            <span :class="'text-' + theme.c2">
                Mihai Daniel Mureșan - 2022
            </span>
        </div>
    `
})