# 使用官方 Node.js 轻量级基础镜像
FROM node:18-alpine as builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock
COPY package*.json yarn.lock ./

# 安装项目依赖
RUN yarn install --production

# 复制应用程序代码
COPY . .

# 构建应用程序
RUN yarn build && yarn cache clean

# 在运行时镜像中只包含构建好的应用程序和运行时依赖
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制构建好的应用程序和运行时依赖
COPY --from=builder /app .

# 暴露服务运行的端口
EXPOSE 6000

# 启动 Node.js 服务
CMD ["yarn", "start"]
