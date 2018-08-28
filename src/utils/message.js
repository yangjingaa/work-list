import { message as antMessage} from 'antd'

// const modalError = Modal.error;

/**
 * 消息配置
 */
antMessage.config({
    duration: 1.5,
});

/**
 * 消息提示
 * @type {{info: message.info, success: message.success, warn: message.warn, innerError: message.innerError, error: *, confirm: message.confirm, notify: message.notify}}
 */
const message = {
    /**
     * 普通信息
     * @param content
     * @param onClose
     */
    info: (content, onClose, duration) => {
        antMessage.info(content, duration, onClose)
    },

    /**
     * 成功后的反馈信息, 轻量级提示方式
     * @param content  数据类型不为 object array
     * @param onClose
     */
    success: (content, onClose, duration) => {
        if (typeof content==="object") return;
        antMessage.success(content, duration, onClose)
    },
    /**
     * 警告信息, 轻量级提示方式
     * @param content
     * @param onClose
     */
    warn: (content, onClose, duration) => {
        antMessage.warning(content, duration, onClose)
    },
    /**
     * 错误
     * @param content
     * @param onClose
     * @param duration
     */
    error: (content, onClose, duration) => {
        antMessage.error(content, onClose, duration)
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

export default message;