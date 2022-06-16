export default {
    methods: {
        sizeChange(val) {
            this.page.currentPage = 1
            this.page.pageSize = val
            this.getList()
            this.getLable()
            this.getData(code)
        },
        currentChange(val) {
            this.page.currentPage = val
            this.getList()
            this.getLable()
            this.getData(code)
        },
    },
}