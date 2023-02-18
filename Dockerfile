# 使用官方 Node.js 基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./
COPY yarn.lock ./

# 安装项目依赖
RUN yarn

# 将应用程序代码复制到工作目录
COPY . .

# 暴露服务运行的端口
EXPOSE 3000

# 启动 Node.js 服务
CMD [ "yarn", "start" ]
