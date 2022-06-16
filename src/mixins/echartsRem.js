export default {
    data(){
        return {

        }
    },
    methods: {
        echartsRem(res){
            // let docEl = document.documentElement,
            let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
            //let clientWidth = 9120;
            if (!clientWidth) return;
            let fontSize = (clientWidth / 9120);
            return res*fontSize;
        },   
        getStyles (h, w) {
            return `height : ${this.echartsRem(h)}px;width : ${this.echartsRem(w)}px;`
        },
    },
}