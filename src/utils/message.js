

// const modalError = Modal.error;
const modalConfirm = Modal.confirm;

/**
 * 消息配置
 */
antdMsg.config({
    duration: 1.5,
});

/**
 * 通知配置
 */
notification.config({
    placement: 'topRight',
    top: 70,
    duration: 5, // 单位秒
});

/**
 * 消息提示
 * @type {{info: message.info, success: message.success, warn: message.warn, innerError: message.innerError, error: *, confirm: message.confirm, notify: message.notify}}
 */
const message = {
    /**
     * 普通信息
     * @param content
     *
     * @param onClose
     */
    info: (content, onClose, duration) => {
    },

    /**
     * 成功后的反馈信息, 轻量级提示方式
     * @param content
     * @param onClose
     */
    success: (content, onClose, duration) => {
    },
    /**
     * 警告信息, 轻量级提示方式
     * @param content
     * @param onClose
     */
    warn: (content, onClose, duration) => {
    },
    /**
     * 发生错误
     * @param content
     * @param desc
     */
    innerError: (content, desc) => {

    },
    /**
     * 确认消息
     * @param onOk 点击确定回调
     * @param content 确认消息的内容
     * @param desc 确认描述信息
     * @param onCancel 点击遮罩层或右上角叉或取消按钮的回调
     */
    confirm: (onOk, content = '确认要删除吗?', desc = '提示: 删除后不可恢复', onCancel) => {

    },

    /**
     * 通知
     * @param content
     * @param title
     * @param autoClose
     */
    notify: (content, title, autoClose = true) => {

    },
};

/**
 * 使用简单函数节流 控制错误信息的弹出
 */
message.error = tools.throttle(message.innerError, 300);


export default message;