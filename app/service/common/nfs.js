/**
 * Service
 * @return
 */
const {base, helper} = require('thinkkoa');
const fs = require('fs');
const path = require('path');
const lib = require('think_lib');
const fileType = require('file-type');
const readChunk = require('read-chunk');
const mime = require('mime-types');
const miniTypes = ['jpg', 'png', 'gif', 'webp', 'zip', 'tar', 'rar', 'gz', '7z', 'mp4', 'webm', 'mov', 'avi', '3gp', 'pdf', 'epub', 'docx', 'pptx', 'xlsx'];

module.exports = class extends base {
    init(params, app) {
        this.app = app;
        this.options = lib.extend(this.app.config('nfs'), params, true);
    }

    /**
     * nfs.putObject(ctx.file('formItem'))
     * 
     * @param {any} file 
     * @returns 
     */
    /*eslint-disable consistent-return*/
    async putObject(file) {
        if (!lib.isEmpty(file.name) && !lib.isEmpty(file.path) && !lib.isEmpty(file.size)) {
            let mimetype, ftype;
            try {
                mimetype = path.extname(file.path).split('.').pop();
                // if (miniTypes.indexOf(mimetype) > -1) {
                //     const buffer = readChunk.sync(file.path, 0, 4100);
                //     ftype = fileType(buffer);
                // }
                // //if file-type not support
                // if (ftype) {
                //     mimetype = ftype.ext;
                // } else {
                //     mimetype = mime.extension(file.type);
                // }
            } catch (e) { }
            if (!mimetype || (this.options.file_allow_type || '').split('|').indexOf(mimetype) < 0) {
                throw Error(`允许上传的类型:${this.options.file_allow_type}`);
            }
            if (file.size > this.options.max_file_size) {
                throw Error('上传的文件大小超过限制');
            }
            file.newFileName = lib.md5(file.name + file.size) + '.' + mimetype;
            file.newFilePath = lib.datetime('', 'YYYY/MM/DD') + '/';

            let localSavePath = this.options.file_save_path + file.newFilePath;
            if (!lib.isDir(localSavePath)) {
                lib.mkDir(localSavePath);
            }

            let readStream = fs.createReadStream(file.path);
            let writeStream = fs.createWriteStream(localSavePath + file.newFileName);
            let defferd = lib.getDefer();
            writeStream.on('error', function (err) {
                defferd.reject(err);
            });
            writeStream.on('finish', function () {
                defferd.resolve();
            });
            readStream.pipe(writeStream);

            return defferd.promise.then(() => {
                return { filename: file.newFileName, fileurl: file.newFilePath + file.newFileName, filesize: file.size, fileType: mimetype };
            }).catch(e => {
                throw Error('上传文件错误');
            });
        }
    }

    /**
     * nfs.putObject(fileUrl, ctx)
     * 
     * @param {any} fileUrl 
     * @param {any} fileName 
     * @param {any} ctx 
     * @returns 
     */
    getStream(fileUrl, fileName, ctx) {
        fileUrl = this.options.file_save_path + fileUrl;
        if (!helper.isFile(fileUrl)) {
            ctx.body = '';
            return;
        }
        fileName = fileName || path.basename(fileUrl);
        let stats = fs.statSync(fileUrl, {
            encoding: 'utf8'
        });
        ctx.response.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename=${fileName}`,
            'Content-Length': stats.size,
            'Accept-Ranges': 'bytes'
        });
        const stream = fs.createReadStream(fileUrl);
        ctx.body = stream.pipe(ctx.res);
        return;
    }

    getFile(fileUrl, fileName, ctx) {
        fileUrl = this.options.file_save_path + fileUrl;
        if (!helper.isFile(fileUrl)) {
            ctx.body = '';
            return;
        }
        fileName = fileName || path.basename(fileUrl);
        ctx.set('Content-disposition', 'attachment; filename=' + encodeURIComponent(fileName));
        return fs.createReadStream(fileUrl);
    }
};