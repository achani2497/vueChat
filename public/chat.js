const socket = io()
new Vue({
    el: '#app',
    data: {
        username:'',
        typing: false,
        message:'',
        messages:[],
        step: 'nick',
        typingMessage:''
    },
    methods:{
        send:function (){
            if(this.typing){
                this.typing = false
            }
            console.log('1 - send')
            this.sendMessage(this.message)
            this.message = ''
        },
        signIn: function(){
            if(!this.username){
                return
            }
            this.addParticipantMessage()
            this.step = 'chat'
        },
        addParticipantMessage: function(){
            message = this.username+' se conectó'
            this.sendMessage(message)
        },
        setUsername: function(){
            socket.emit('add-user', this.username)
        },
        informTyping: function(){
            socket.emit('typing', {
                username: this.username,
                date: new Date().getTime()
            })
        },
        sendMessage: function(message){
            console.log('2 - Send Message')
            socket.emit('new-message',{
                username: this.username,
                message: message,
                date: new Date().getTime()
            })
        },
        isTyping: function(username){
            this.typingMessage = username+' está escribiendo . . .'
        },

    },
    mounted: function(){
        socket.on('new-message', (msg) => {
            this.messages.push(msg)
            this.typing = false
            this.typingMessage = ''
        })
        socket.on('typing', (msg) => {
            if(!this.typing){
                this.typing = true
                socket.emit('is-typing', {
                    username: msg.username, //Nick de la otra persona
                })
            }
        })
        socket.on('is-typing', (user) => {
            if(this.username !== user.username){
                console.log(user.username+' está escribiendo')
                this.isTyping(user.username)
            }
        })

        setTimeout(() => {
            const chatContainer = document.getElementById('chat-container')
            chatContainer.scrollTop = chatContainer.scrollHeight
        }, 10)
    }
})