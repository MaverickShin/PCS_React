var oracledb = require('oracledb')
var dbConfig = require('./dbConfig')  // 경로 주의

// express 기본 모듈
var express = require('express');
var http = require('http');
var path = require('path');

// 익스프레스 서버 객체 생성
var app = express();

// 기본 속성 설정 => db.js에서 설정한 포트번호와 package.json에서 설정한 포트번호가 반드시 일치해야 한다.
// package.json에 반드시 추가 => "proxy": "http://localhost:5000",
app.set('port', process.env.PORT || 5000);  // PORT || 포트번호 => 포트 중복안되게

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var router = express.Router();

// 오라클 자동 커밋 설정
oracledb.autoCommit = true;

// -----------------------------------
// 결산 조회
app.get('/admin/settle', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        let query = 'select k.pay_kind as PAYKIND, sum(b.by_sum) as PRICE, sum(b.by_fees) as FEE '
        + 'from PAYKIND_TB k, BUYLIST_TB b '
        + 'where k.paykind_cd = b.paykind_cd '
        + 'group by k.pay_kind, k.paykind_cd ';
        connection.execute(query, [], {outFormat:oracledb.OBJECT}, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);  // 데이터
            doRelease(connection, result.rows);  // connection 해제
            response.send(result.rows);
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }

            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log('list size:' + rowList.length);
            console.log('rowList:' + rowList);   // nodemon 콘솔창에 select 결과
        });
    }
});

// 구독자 현황 조회
app.get('/admin/subscriber', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        let query = 'select AUTHOR, count(*) as PERSONNEL from customer_tb group by AUTHOR ';
        connection.execute(query, [], {outFormat:oracledb.OBJECT}, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);  // 데이터
            doRelease(connection, result.rows);  // connection 해제
            response.send(result.rows);
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }

            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log('list size:' + rowList.length);
            console.log('rowList:' + rowList);   // nodemon 콘솔창에 select 결과
        });
    }
});

// 신규 회원 조회
app.get('/admin/member', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        let query = 'SELECT CUST_ID, CUST_NM, AUTHOR, CUST_DT, RNUM  '
        + 'FROM ' 
        + '(SELECT CUST_ID, CUST_NM, AUTHOR, CUST_DT, rowNum RNUM '  
        + 'FROM ( SELECT * '  
        + 'FROM customer_tb '
        + 'ORDER BY CUST_DT DESC ' 
        + ') '  
        + ') '  
        + 'WHERE RNUM >= 1 AND RNUM <= 5 ';
        connection.execute(query, [], {outFormat:oracledb.OBJECT}, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);  // 데이터
            doRelease(connection, result.rows);  // connection 해제
            response.send(result.rows);
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }

            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log('list size:' + rowList.length);
            console.log('rowList:' + rowList);   // nodemon 콘솔창에 select 결과
        });
    }
});

// qna 문의 조회
app.get('/admin/qnalist', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        let query = 'SELECT CUST_ID, CUST_NM, QNA_TITLE, QNA_CONTENT, QNA_DT, QNA_KIND, QNA_CD, RNUM '
                  + 'FROM ' 
                  +      '(SELECT cust_id, cust_nm, qna_title, qna_content, qna_dt, qna_kind, qna_cd, rowNum RNUM '   
                  +       'FROM ' 
                  +          '( SELECT c.cust_id, c.cust_nm, q.qna_title, q.qna_content, q.qna_dt, k.qna_kind, q.qna_cd ' 
                  +            'FROM customer_tb c, qna_tb q, qnakind_tb k '
                  +            'WHERE q.cust_id = c.cust_id '
                  +            'AND q.qk_cd = k.qk_cd '
                  +            'AND q.qna_answer IS NULL '
                  +            'ORDER BY q.qna_dt DESC ' 
                  +          ') '        
                  +  ') ' 
                  +  'WHERE RNUM >= 1 AND RNUM <= 5 ';
        connection.execute(query, [], {outFormat:oracledb.OBJECT}, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);  // 데이터
            doRelease(connection, result.rows);  // connection 해제
            response.send(result.rows);
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }

            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log('list size:' + rowList.length);
            console.log('rowList:' + rowList);   // nodemon 콘솔창에 select 결과
        });
    }
});

// FAQ 문의 조회
app.get('/admin/faqlist', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        let query = 'SELECT  FAQ_TITLE, FAQ_CONTENT, FAQ_KIND, FAQ_CD, RNUM '
                  + 'FROM ' 
                  +      '(SELECT FAQ_TITLE, FAQ_CONTENT, FAQ_KIND, FAQ_CD, rowNum RNUM '   
                  +       'FROM ' 
                  +          '( SELECT f.FAQ_TITLE, f.FAQ_CONTENT, k.FAQ_KIND, f.FAQ_CD ' 
                  +            'FROM faq_tb f, faqkind_tb k '
                  +            'WHERE f.fk_cd = k.fk_cd '
                  +            'ORDER BY f.faq_cd DESC ' 
                  +          ') '        
                  +  ') ' 
                  +  'WHERE RNUM >= 1 AND RNUM <= 5 ';
        connection.execute(query, [], {outFormat:oracledb.OBJECT}, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);  // 데이터
            doRelease(connection, result.rows);  // connection 해제
            response.send(result.rows);
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }

            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log('list size:' + rowList.length);
            console.log('rowList:' + rowList);   // nodemon 콘솔창에 select 결과
        });
    }
});

// 시터 요금 조회
app.get('/admin/sitter', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        let query = 'SELECT SF_CD, SF_FEE, PK_KIND, PK_DETAIL, PK_CD, rowNum RNUM '  
                 +  'FROM ( SELECT s.sf_cd, s.sf_fee, p.pk_kind, p.pk_detail, p.pk_cd ' 
                 +  'FROM pet_kind_tb p, sitter_fee_tb s '
                 +  'WHERE s.pk_cd = p.pk_cd '
                 +  'ORDER BY s.sf_cd DESC ) ';
        connection.execute(query, [], {outFormat:oracledb.OBJECT}, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.rows);  // 데이터
            doRelease(connection, result.rows);  // connection 해제
            response.send(result.rows);
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }

            // DB 종료까지 모두 완료되었을시 응답 데이터 반환
            console.log('list size:' + rowList.length);
            console.log('rowList:' + rowList);   // nodemon 콘솔창에 select 결과
        });
    }
});




// 시터 요금 등록
router.post('/admin/sitteradd', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        // PrepareStatement - :컬럼명과 binddata 갯수와 이름이 일치해야 함
        let query = 'INSERT ALL ' 
   		        +   'INTO PET_KIND_TB VALUES (PK_CD_SEQ.nextval, :pk_kind, :pk_detail) '
   		        +   'INTO SITTER_FEE_TB VALUES(SF_CD_SEQ.nextval , PK_CD_SEQ.currval , :sf_fee) '
		        +   'SELECT * FROM DUAL ';
        var binddata = [
            request.body.pk_kind,
            request.body.pk_detail,
            request.body.sf_fee 
        ]
        connection.execute(query, binddata, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Insert : ' + result.rowsAffected);  // 데이터
            doRelease(connection, result.rowsAffected);  // connection 해제
            response.redirect('/');
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }
        });
    }
});

// faq 등록
router.post('/admin/faqadd', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        // PrepareStatement - :컬럼명과 binddata 갯수와 이름이 일치해야 함
        let query = 'INSERT INTO FAQ_TB (FAQ_CD, FK_CD, FAQ_TITLE, FAQ_CONTENT) VALUES (FAQ_CD_SEQ.nextval, :fk_cd, :faq_title, :faq_content) ';

        var binddata = [
            request.body.fk_cd,
            request.body.faq_title,
            request.body.faq_content 
        ]
        connection.execute(query, binddata, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Insert : ' + result.rowsAffected);  // 데이터
            doRelease(connection, result.rowsAffected);  // connection 해제
            response.redirect('/');
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }
        });
    }
});


// 로그인
router.post('/admin/login', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        // PrepareStatement - :컬럼명과 binddata 갯수와 이름이 일치해야 함
        let query = 'select count(*) as CNT from MANAGERS_TB where mg_id = :mg_id, and mg_pwd = :mg_pwd';

        var binddata = [
            request.body.mg_id,
            request.body.mg_pwd
        ]
        connection.execute(query, binddata, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row result : ' + result.rowsAffected);  // 데이터
            doRelease(connection, result.rowsAffected);  // connection 해제
            response.redirect('/');
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }
        });
    }
});





// -----------------------------------
// qna 답변 등록
router.post('/admin/qnaadd', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        // PrepareStatement - :컬럼명과 binddata 갯수와 이름이 일치해야 함
        let query = 'UPDATE qna_tb SET qna_answer = :qna_answer '
                    + 'WHERE qna_cd = :qna_cd';
        var binddata = [
            request.body.qna_answer,
            request.body.qna_cd
        ]

        connection.execute(query, binddata, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Insert : ' + result.rowsAffected);  // 데이터
            doRelease(connection, result.rowsAffected);  // connection 해제
            response.redirect('/board');
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }
        });
    }
});


// 시터 요금 수정
router.post('/admin/sittermodi', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        // PrepareStatement - :컬럼명과 binddata 갯수와 이름이 일치해야 함
        let query = 'UPDATE SITTER_FEE_TB SET SF_FEE = :sf_fee '
                    + 'WHERE SF_CD = :sf_cd';
        var binddata = [
            request.body.sf_fee,
            request.body.sf_cd
        ]

        connection.execute(query, binddata, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Insert : ' + result.rowsAffected);  // 데이터
        });

        let query2 = 'UPDATE pet_kind_tb SET pk_kind = :pk_kind, pk_detail = :pk_detail '
                    + 'WHERE pk_cd = :pk_cd';
        let binddata2 = [
            request.body.pk_kind,
            request.body.pk_detail,
            request.body.pk_cd
        ]

        connection.execute(query2, binddata2, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('시터 업데이트 2 : ' + result.rowsAffected);  // 데이터
            doRelease(connection, result.rowsAffected);  // connection 해제
            response.redirect('/sit');
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }
        });
    }
});

// faq 수정
router.post('/admin/faqmodi', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        // PrepareStatement - :컬럼명과 binddata 갯수와 이름이 일치해야 함
        let query = 'UPDATE faq_tb SET faq_title = :faq_title, faq_content = :faq_content, fk_cd = :fk_cd '
                    + 'WHERE faq_cd = :faq_cd';
        var binddata = [
            request.body.faq_title,
            request.body.faq_content,
            request.body.fk_cd,
            request.body.faq_cd
        ]

        connection.execute(query, binddata, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('faq 업데이트 : ' + result.rowsAffected);  // 데이터
            doRelease(connection, result.rowsAffected);  // connection 해제
            response.redirect('/board');
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }
        });
    }
});



// -----------------------------------
// 데이터 삭제

// 시터 요금 삭제
router.post('/admin/sitterdel', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        // PrepareStatement - :컬럼명과 binddata 갯수와 이름이 일치해야 함
        let query = 'DELETE FROM sitter_fee_tb WHERE sf_cd = :sf_cd';
        var binddata = [
            request.body.sf_cd
        ]
        connection.execute(query, binddata, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Insert : ' + result.rowsAffected);  // 데이터
            doRelease(connection, result.rowsAffected);  // connection 해제
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }
        });
    }
});


// faq 삭제
router.post('/admin/faqdel', function(request, response) {
    console.log('------------- boardList select --------------');   // nodemon 콘솔에서 확인
    oracledb.getConnection({
        user : dbConfig.user,
        password : dbConfig.password,
        connectString : dbConfig.connectString 
    },
    function(err, connection) {
        if(err) {
            console.log('[ 접속 실패 ]', err);
            console.error(err.message);
            return;
        }
        console.log('[ 접속 성공 ]');
        // PrepareStatement - :컬럼명과 binddata 갯수와 이름이 일치해야 함
        let query = 'DELETE FROM faq_tb WHERE faq_cd = :faq_cd';
        var binddata = [
            request.body.faq_cd
        ]
        connection.execute(query, binddata, function(err, result) {
            if(err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log('Row Insert : ' + result.rowsAffected);  // 데이터
            doRelease(connection, result.rowsAffected);  // connection 해제
        });
    });

    // DB 연결 해제
    function doRelease(connection, rowList) {
        connection.release(function(err, rows) {
            if(err) {
                console.error(err.message);
            }
        });
    }
});

// -----------------------------------

// 라우터 객체를 app 객체에 등록
app.use('/', router);

// 등록되지 않은 패스에 대해 페이지 오류 응답
app.all('*', function(req, res) {
    res.status(404).send('<h3>ERROR - 페이지를 찾을 수 없습니다.</h3');
});

// express  서버 시작
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server listening in port' + app.get('port'));
});