// post/[id].js

import { useRouter } from 'next/router';
import Head from 'next/head'
import axios from 'axios';
import { END } from 'redux-saga';

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import Layout from '../../components/Layout'

const PostId = () => {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector( state => state.post )

    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch({
        //     type: LOAD_POST_REQUEST,
        //     data: id,
        // })
        console.log('asd: ', singlePost)
    }, [])
    

    return (
        <Layout>
            <Head>
                <title>{singlePost.User.nickname}님의 글</title>
                <meta name="description" content={singlePost.content} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} /> {/* 공유했을 때  */}
                <meta property="og:description" content={singlePost.content} />
                <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'http://localhost:3060/favicon.ico'} />
                <meta property="og:url" content={`http://localhost:3060/post/${id}`} />
            </Head>
            {id}
            
            {singlePost ? (
                <>
                    nickanme: {singlePost.User.nickname} <br />
                    content: {singlePost.content} <br /> 
                </>
            ) : (
                <div>유저가 없습니다</div>
            )}
           

        </Layout>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('server side props start post/id')

    
    const cookie = context.req ? context.req.headers.cookie : ''; 
    axios.defaults.headers.Cookie = '';
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie; //백엔드에 쿠키전달
    }

    // console.log('쿠킹:', axios.defaults.headers.Cookie)

    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    })

    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id,  //context.params.id 하거나 context.query.id 하면 [id]에 접근가능
    })
    
  
    console.log('server side props end')
    context.store.dispatch(END)
    await context.store.sagaTask.toPromise();
})


export default PostId;


// context object
// server side props start post/id
// {
//   req: IncomingMessage {
//     _readableState: ReadableState {
//       objectMode: false,
//       highWaterMark: 16384,
//       buffer: BufferList { head: null, tail: null, length: 0 },
//       length: 0,
//       pipes: null,
//       pipesCount: 0,
//       flowing: null,
//       ended: true,
//       endEmitted: false,
//       reading: false,
//       sync: true,
//       needReadable: false,
//       emittedReadable: false,
//       readableListening: false,
//       resumeScheduled: false,
//       paused: true,
//       emitClose: true,
//       autoDestroy: false,
//       destroyed: false,
//       defaultEncoding: 'utf8',
//       awaitDrain: 0,
//       readingMore: true,
//       decoder: null,
//       encoding: null
//     },
//     readable: true,
//     _events: [Object: null prototype] {
//       end: [Function: resetHeadersTimeoutOnReqEnd]
//     },
//     _eventsCount: 1,
//     _maxListeners: undefined,
//     socket: Socket {
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: null,
//       _readableState: [ReadableState],
//       readable: true,
//       _events: [Object: null prototype],
//       _eventsCount: 8,
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       writable: true,
//       allowHalfOpen: true,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: [Server],
//       _server: [Server],
//       timeout: 120000,
//       parser: [HTTPParser],
//       on: [Function: socketListenerWrap],
//       addListener: [Function: socketListenerWrap],
//       prependListener: [Function: socketListenerWrap],
//       _paused: false,
//       _httpMessage: [ServerResponse],
//       [Symbol(asyncId)]: 396986,
//       [Symbol(kHandle)]: [TCP],
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: Timeout {
//         _idleTimeout: 120000,
//         _idlePrev: [TimersList],
//         _idleNext: [Timeout],
//         _idleStart: 5467121,
//         _onTimeout: [Function: bound ],
//         _timerArgs: undefined,
//         _repeat: null,
//         _destroyed: false,
//         [Symbol(refed)]: false,
//         [Symbol(asyncId)]: 396987,
//         [Symbol(triggerId)]: 396986
//       },
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0
//     },
//     connection: Socket {
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: null,
//       _readableState: [ReadableState],
//       readable: true,
//       _events: [Object: null prototype],
//       _eventsCount: 8,
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       writable: true,
//       allowHalfOpen: true,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: [Server],
//       _server: [Server],
//       timeout: 120000,
//       parser: [HTTPParser],
//       on: [Function: socketListenerWrap],
//       addListener: [Function: socketListenerWrap],
//       prependListener: [Function: socketListenerWrap],
//       _paused: false,
//       _httpMessage: [ServerResponse],
//       [Symbol(asyncId)]: 396986,
//       [Symbol(kHandle)]: [TCP],
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: Timeout {
//         _idleTimeout: 120000,
//         _idlePrev: [TimersList],
//         _idleNext: [Timeout],
//         _idleStart: 5467121,
//         _onTimeout: [Function: bound ],
//         _timerArgs: undefined,
//         _repeat: null,
//         _destroyed: false,
//         [Symbol(refed)]: false,
//         [Symbol(asyncId)]: 396987,
//         [Symbol(triggerId)]: 396986
//       },
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0
//     },
//     httpVersionMajor: 1,
//     httpVersionMinor: 1,
//     httpVersion: '1.1',
//     complete: true,
//     headers: {
//       host: 'localhost:3060',
//       connection: 'keep-alive',
//       'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
//       'sec-ch-ua-mobile': '?0',
//       'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
//       accept: '*/*',
//       'sec-fetch-site': 'same-origin',
//       'sec-fetch-mode': 'cors',
//       'sec-fetch-dest': 'empty',
//       referer: 'http://localhost:3060/post/46',
//       'accept-encoding': 'gzip, deflate, br',
//       'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
//       cookie: 'connect.sid=s%3Appf2Ins3Ky3FJBOa30d1cDB7EDNVRZJX.ctb7Rf4hSJK9F%2FotXs7%2FGMYQK9kigXx6LriTWVogJDg',
//       'if-none-match': '"c5c-yNRzCvWPwxk2Jq4jI8LbyKfNGgo"'
//     },
//     rawHeaders: [
//       'Host',
//       'localhost:3060',
//       'Connection',
//       'keep-alive',
//       'sec-ch-ua',
//       '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
//       'sec-ch-ua-mobile',
//       '?0',
//       'User-Agent',
//       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36',
//       'Accept',
//       '*/*',
//       'Sec-Fetch-Site',
//       'same-origin',
//       'Sec-Fetch-Mode',
//       'cors',
//       'Sec-Fetch-Dest',
//       'empty',
//       'Referer',
//       'http://localhost:3060/post/46',
//       'Accept-Encoding',
//       'gzip, deflate, br',
//       'Accept-Language',
//       'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
//       'Cookie',
//       'connect.sid=s%3Appf2Ins3Ky3FJBOa30d1cDB7EDNVRZJX.ctb7Rf4hSJK9F%2FotXs7%2FGMYQK9kigXx6LriTWVogJDg',
//       'If-None-Match',
//       '"c5c-yNRzCvWPwxk2Jq4jI8LbyKfNGgo"'
//     ],
//     trailers: {},
//     rawTrailers: [],
//     aborted: false,
//     upgrade: false,
//     url: '/_next/data/development/post/46.json?id=46',
//     method: 'GET',
//     statusCode: null,
//     statusMessage: null,
//     client: Socket {
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: null,
//       _readableState: [ReadableState],
//       readable: true,
//       _events: [Object: null prototype],
//       _eventsCount: 8,
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       writable: true,
//       allowHalfOpen: true,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: [Server],
//       _server: [Server],
//       timeout: 120000,
//       parser: [HTTPParser],
//       on: [Function: socketListenerWrap],
//       addListener: [Function: socketListenerWrap],
//       prependListener: [Function: socketListenerWrap],
//       _paused: false,
//       _httpMessage: [ServerResponse],
//       [Symbol(asyncId)]: 396986,
//       [Symbol(kHandle)]: [TCP],
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: Timeout {
//         _idleTimeout: 120000,
//         _idlePrev: [TimersList],
//         _idleNext: [Timeout],
//         _idleStart: 5467121,
//         _onTimeout: [Function: bound ],
//         _timerArgs: undefined,
//         _repeat: null,
//         _destroyed: false,
//         [Symbol(refed)]: false,
//         [Symbol(asyncId)]: 396987,
//         [Symbol(triggerId)]: 396986
//       },
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0
//     },
//     _consuming: false,
//     _dumped: false,
//     cookies: [Getter/Setter],
//     __NEXT_INIT_QUERY: { id: '46' },
//     __nextReduxWrapperStore: {
//       dispatch: [Function],
//       subscribe: [Function: subscribe],
//       getState: [Function: getState],
//       replaceReducer: [Function: replaceReducer],
//       sagaTask: [Object],
//       [Symbol(observable)]: [Function: observable]
//     }
//   },
//   res: ServerResponse {
//     _events: [Object: null prototype] { finish: [Function: bound resOnFinish] },
//     _eventsCount: 1,
//     _maxListeners: undefined,
//     outputData: [],
//     outputSize: 0,
//     writable: true,
//     _last: false,
//     chunkedEncoding: false,
//     shouldKeepAlive: true,
//     useChunkedEncodingByDefault: true,
//     sendDate: true,
//     _removedConnection: false,
//     _removedContLen: false,
//     _removedTE: false,
//     _contentLength: null,
//     _hasBody: true,
//     _trailer: '',
//     finished: false,
//     _headerSent: false,
//     socket: Socket {
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: null,
//       _readableState: [ReadableState],
//       readable: true,
//       _events: [Object: null prototype],
//       _eventsCount: 8,
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       writable: true,
//       allowHalfOpen: true,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: [Server],
//       _server: [Server],
//       timeout: 120000,
//       parser: [HTTPParser],
//       on: [Function: socketListenerWrap],
//       addListener: [Function: socketListenerWrap],
//       prependListener: [Function: socketListenerWrap],
//       _paused: false,
//       _httpMessage: [Circular],
//       [Symbol(asyncId)]: 396986,
//       [Symbol(kHandle)]: [TCP],
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: Timeout {
//         _idleTimeout: 120000,
//         _idlePrev: [TimersList],
//         _idleNext: [Timeout],
//         _idleStart: 5467121,
//         _onTimeout: [Function: bound ],
//         _timerArgs: undefined,
//         _repeat: null,
//         _destroyed: false,
//         [Symbol(refed)]: false,
//         [Symbol(asyncId)]: 396987,
//         [Symbol(triggerId)]: 396986
//       },
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0
//     },
//     connection: Socket {
//       connecting: false,
//       _hadError: false,
//       _parent: null,
//       _host: null,
//       _readableState: [ReadableState],
//       readable: true,
//       _events: [Object: null prototype],
//       _eventsCount: 8,
//       _maxListeners: undefined,
//       _writableState: [WritableState],
//       writable: true,
//       allowHalfOpen: true,
//       _sockname: null,
//       _pendingData: null,
//       _pendingEncoding: '',
//       server: [Server],
//       _server: [Server],
//       timeout: 120000,
//       parser: [HTTPParser],
//       on: [Function: socketListenerWrap],
//       addListener: [Function: socketListenerWrap],
//       prependListener: [Function: socketListenerWrap],
//       _paused: false,
//       _httpMessage: [Circular],
//       [Symbol(asyncId)]: 396986,
//       [Symbol(kHandle)]: [TCP],
//       [Symbol(lastWriteQueueSize)]: 0,
//       [Symbol(timeout)]: Timeout {
//         _idleTimeout: 120000,
//         _idlePrev: [TimersList],
//         _idleNext: [Timeout],
//         _idleStart: 5467121,
//         _onTimeout: [Function: bound ],
//         _timerArgs: undefined,
//         _repeat: null,
//         _destroyed: false,
//         [Symbol(refed)]: false,
//         [Symbol(asyncId)]: 396987,
//         [Symbol(triggerId)]: 396986
//       },
//       [Symbol(kBuffer)]: null,
//       [Symbol(kBufferCb)]: null,
//       [Symbol(kBufferGen)]: null,
//       [Symbol(kBytesRead)]: 0,
//       [Symbol(kBytesWritten)]: 0
//     },
//     _header: null,
//     _onPendingData: [Function: bound updateOutgoingData],
//     _sent100: false,
//     _expect_continue: false,
//     statusCode: 200,
//     flush: [Function: flush],
//     write: [Function: write],
//     end: [Function: end],
//     on: [Function: on],
//     writeHead: [Function: writeHead],
//     [Symbol(kNeedDrain)]: false,
//     [Symbol(isCorked)]: false,
//     [Symbol(kOutHeaders)]: null
//   },
//   query: { id: '46' },
//   resolvedUrl: '/post/46?id=46',
//   params: { id: '46' },
//   locales: undefined,
//   locale: undefined,
//   defaultLocale: undefined,
//   store: {
//     dispatch: [Function],
//     subscribe: [Function: subscribe],
//     getState: [Function: getState],
//     replaceReducer: [Function: replaceReducer],
//     sagaTask: {
//       '@@redux-saga/TASK': true,
//       id: 2495,
//       meta: [Object],
//       isRoot: true,
//       context: {},
//       joiners: [],
//       queue: [Object],
//       cancel: [Function: cancel],
//       cont: [Function: noop],
//       end: [Function: end],
//       setContext: [Function: setContext],
//       toPromise: [Function: toPromise],
//       isRunning: [Function: isRunning],
//       isCancelled: [Function: isCancelled],
//       isAborted: [Function: isAborted],
//       result: [Function: result],
//       error: [Function: error]
//     },
//     [Symbol(observable)]: [Function: observable]
//   }
// }