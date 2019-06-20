import { createConnection, getManager } from "typeorm";
import "reflect-metadata"
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser'
import { WorkItem } from "./entity/workItem";
import cors from "@koa/cors";

createConnection();

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
    ctx.body = 'hello koa'
})

// 获取所有待办事项
router.get('/work-item', async (ctx, next) => {
    const workItemRepository = getManager().getRepository(WorkItem);
    try {
        const workItems = await workItemRepository.find({ order: { createdAt: 'DESC' } });
        ctx.body = workItems;
    } catch (err) {
        throw new Error(err)
    }
})

// 添加代办事项
router.post('/work-item', async (ctx, next) => {
    const workItem = new WorkItem();
    workItem.text = ctx.request.body.text;
    const workItemRepository = getManager().getRepository(WorkItem);
    try {
        ctx.body = await workItemRepository.save(workItem);
    } catch (err) {
        throw new Error(err)
    }
})

// 更新待办事项
router.put('/work-item/:id', async (ctx, next) => {
    const workItemRepository = getManager().getRepository(WorkItem);
    try {
        await workItemRepository.update(ctx.params.id, { text: ctx.query.text });
        ctx.body = { status: 'success' }
    } catch (err) {
        throw new Error(err)
    }
})

// 删除指定id代办事项
router.delete('/work-item/:id', async (ctx, next) => {
    const workItemRepository = getManager().getRepository(WorkItem);
    try {
        await workItemRepository.delete(ctx.params.id);
        ctx.body = { status: 'success' }
    } catch (err) {
        throw new Error(err)
    }
})

app.use(cors())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('server start');
})

