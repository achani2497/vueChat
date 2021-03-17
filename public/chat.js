const socket = io()
new Vue({
    el: '#app',
    data: {
        step:'nick',
        nick:'',
        message:'',
        messages:[]
    },
    methods:{
        send(){
            socket.emit('new-message',{
                nick: this.nick,
                message: this.message,
                date: new Date().getTime()
            })
            this.message = ''
        },
        signIn(){
            if(!this.nick){
                return
            }
            this.step = 'chat'
        }
    },
    mounted(){
        socket.on('new-message', (msg) => {
            this.messages.push(msg)
        })

        setTimeout(() => {
            const chatContainer = document.getElementById('chat-container')
            chatContainer.scrollTop = chatContainer.scrollHeight
        }, 10)
    }
})