// 数据 Model
    var allUser = {
        helloWorld: {
            word: 'Vue MVVM Test'
        },
        holder: {
            name: '',
            age: ''
        },
        status: {
            create: true
        },
        pageData: {
            activeNumber: 1,
            pageCount: 1,
            per_page: 5
        },
        pageUser: null,
        newUser: {
            id: null,
            name: '',
            sex: 'Male',
            age: ''

        },
        users: [{
            name: 'Alen',
            age: 30,
            sex: 'Male'
        }, {
            name: 'Ida',
            age: 26,
            sex: 'Female'
        }, {
            name: 'Galen',
            age: 19,
            sex: 'Male'
        }, {
            name: 'Abbey',
            age: 22,
            sex: 'Female'
        }, {
            name: 'Ned',
            age: 25,
            sex: 'Male'
        }, {
            name: 'Lucy',
            age: 18,
            sex: 'Female'
        }, {
            name: 'Helen',
            age: 37,
            sex: 'Female'
        }, {
            name: 'Pote',
            age: 52,
            sex: 'Male'
        }, {
            name: 'Vera',
            age: 42,
            sex: 'Female'
        }, {
            name: 'Quincy',
            age: 35,
            sex: 'Male'
        }]
    };

    // 实例 viewModel

    //创建用户
    var createOne = new Vue({
        el: '#userCreate',
        data: allUser,
        methods: {
            setHolder: function (str) {
                return str ? str : '';
                console.log(str ? str : '');
            },
            createUser: function(status){
                if(status){
                    //新增用户
                    // 简单验证
                    if (this.newUser.name){
                        if (/^\+?[1-9][0-9]*$/.test(this.newUser.age)) {
                            // 添加用户
                            this.users.push(this.newUser);
                            //重置 newUser
                            this.newUser = {name: '', age: '', sex: 'Male'}
                            this.holder.age = '';
                            this.holder.name = '';
                        }else if (this.newUser.age) {
                            this.holder.age = 'must be int';
                            this.newUser.age = '';
                        } else {
                            this.holder.age = 'must be filled in';
                            this.newUser.age = '';
                        }
                    }else if (!this.newUser.age) {
                        this.holder.age = 'must be filled in';
                        this.newUser.age = '';
                        this.holder.name = 'must be filled in';
                        this.newUser.name = '';
                    }else if(!/^\+?[1-9][0-9]*$/.test(this.newUser.age)){
                        this.holder.age = 'must be int';
                        this.newUser.age = '';
                        this.holder.name = 'must be filled in';
                        this.newUser.name = '';
                    }else {
                        this.holder.name = 'must be filled in';
                        this.newUser.name = '';
                    }
                }else {
                    //编辑用户
                    // 简单验证
                    if (this.newUser.name){
                        if (/^\+?[1-9][0-9]*$/.test(this.newUser.age)) {
                            // 添加用户
                            this.users.splice(this.newUser.id, 1, this.newUser);
                            //重置 newUser
                            this.newUser = {id: null, name: '', age: '', sex: 'Male'}
                            this.holder.age = '';
                            this.holder.name = '';
                            this.status.create = true;
                        }else if (this.newUser.age) {
                            this.holder.age = 'must be int';
                            this.newUser.age = '';
                        } else {
                            this.holder.age = 'must be filled in';
                            this.newUser.age = '';
                        }
                    }else if (!this.newUser.age) {
                        this.holder.age = 'must be filled in';
                        this.newUser.age = '';
                        this.holder.name = 'must be filled in';
                        this.newUser.name = '';
                    }else if(!/^\+?[1-9][0-9]*$/.test(this.newUser.age)){
                        this.holder.age = 'must be int';
                        this.newUser.age = '';
                        this.holder.name = 'must be filled in';
                        this.newUser.name = '';
                    }else {
                        this.holder.name = 'must be filled in';
                        this.newUser.name = '';
                    }
                }
            },


        }
    });

    //用户列表、编辑、删除用户
    var listAll = new Vue({
        el: '#userList',
        data: allUser,
        methods:{
            deleteUser: function(user){
                // 删除用户
                this.users.splice(user,1);
                // console.log(user);
            },
            editUser: function(e){
                //编辑用户
                var currentUser = this.users.slice(e,e+1);
                this.newUser.id = e;
                this.newUser.name = currentUser[0].name;
                this.newUser.age = currentUser[0].age;
                this.newUser.sex = currentUser[0].sex;
                this.status.create = false;
            },
        }
    });

    //分页
    var pagination = new Vue({
        el: '#pagination',
        data: {
            page: allUser.pageData,
            user: allUser.users,
            show: allUser.pageUser
        },
        created: function () {
            //页数初始化
            var user_count = allUser.users.length;
            //计算页数
            this.$set(allUser.pageData, 'pageCount', Math.ceil(user_count/allUser.pageData.per_page));
            //默认显示的用户
            var user= allUser.users.slice(0,allUser.pageData.per_page);
            this.$set(allUser, 'pageUser', user);
            // console.log(allUser.pageUser);
        },
        watch: {
            user: function () {
                //监听用户变化计算页数
                var user_count = allUser.users.length;
                this.$set(allUser.pageData, 'pageCount', Math.ceil(user_count/allUser.pageData.per_page));
                // console.log(Math.ceil(user_count/5));
            }
        },
        methods: {
            listUser: function(page){
                var start = (page-1) * allUser.pageData.per_page;
                var end = page * allUser.pageData.per_page;
                var user= allUser.users.slice(start,end);
                this.$set(allUser, 'pageUser', user);
            },
            jumpPage: function (event) {
                //聚焦选中的页码
                // Vue.set(pagData, 'activeNumber', 3)
                var targe = event.currentTarget.innerHTML;
                this.$set(allUser.pageData, 'activeNumber',parseInt(targe));
                this.listUser(parseInt(targe));
                // console.log(typeof(event.currentTarget.innerHTML));
                // console.log(typeof(pagData.activeNumber));
            }
        }
    })
