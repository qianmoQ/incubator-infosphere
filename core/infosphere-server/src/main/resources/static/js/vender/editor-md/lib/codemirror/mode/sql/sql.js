(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("sql",function(c,f){var d=f.client||{},i=f.atoms||{"false":true,"true":true,"null":true},m=f.builtin||{},g=f.keywords||{},h=f.operatorChars||/^[*+\-%<>!=&|~^]/,n=f.support||{},p=f.hooks||{},b=f.dateSQL||{date:true,time:true,timestamp:true};function e(u,s){var r=u.next();if(p[r]){var q=p[r](u,s);if(q!==false){return q}}if(n.hexNumber==true&&((r=="0"&&u.match(/^[xX][0-9a-fA-F]+/))||(r=="x"||r=="X")&&u.match(/^'[0-9a-fA-F]+'/))){return"number"}else{if(n.binaryNumber==true&&(((r=="b"||r=="B")&&u.match(/^'[01]+'/))||(r=="0"&&u.match(/^b[01]+/)))){return"number"}else{if(r.charCodeAt(0)>47&&r.charCodeAt(0)<58){u.match(/^[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/);n.decimallessFloat==true&&u.eat(".");return"number"}else{if(r=="?"&&(u.eatSpace()||u.eol()||u.eat(";"))){return"variable-3"}else{if(r=="'"||(r=='"'&&n.doubleQuote)){s.tokenize=o(r);return s.tokenize(u,s)}else{if((((n.nCharCast==true&&(r=="n"||r=="N"))||(n.charsetCast==true&&r=="_"&&u.match(/[a-z][a-z0-9]*/i)))&&(u.peek()=="'"||u.peek()=='"'))){return"keyword"}else{if(/^[\(\),\;\[\]]/.test(r)){return null}else{if(n.commentSlashSlash&&r=="/"&&u.eat("/")){u.skipToEnd();return"comment"}else{if((n.commentHash&&r=="#")||(r=="-"&&u.eat("-")&&(!n.commentSpaceRequired||u.eat(" ")))){u.skipToEnd();return"comment"}else{if(r=="/"&&u.eat("*")){s.tokenize=k;return s.tokenize(u,s)}else{if(r=="."){if(n.zerolessFloat==true&&u.match(/^(?:\d+(?:e[+-]?\d+)?)/i)){return"number"}if(n.ODBCdotTable==true&&u.match(/^[a-zA-Z_]+/)){return"variable-2"}}else{if(h.test(r)){u.eatWhile(h);return null}else{if(r=="{"&&(u.match(/^( )*(d|D|t|T|ts|TS)( )*'[^']*'( )*}/)||u.match(/^( )*(d|D|t|T|ts|TS)( )*"[^"]*"( )*}/))){return"number"}else{u.eatWhile(/^[_\w\d]/);var t=u.current().toLowerCase();if(b.hasOwnProperty(t)&&(u.match(/^( )+'[^']*'/)||u.match(/^( )+"[^"]*"/))){return"number"}if(i.hasOwnProperty(t)){return"atom"}if(m.hasOwnProperty(t)){return"builtin"}if(g.hasOwnProperty(t)){return"keyword"}if(d.hasOwnProperty(t)){return"string-2"}return null}}}}}}}}}}}}}}function o(q){return function(u,s){var t=false,r;while((r=u.next())!=null){if(r==q&&!t){s.tokenize=e;break}t=!t&&r=="\\"}return"string"}}function k(r,q){while(true){if(r.skipTo("*")){r.next();if(r.eat("/")){q.tokenize=e;break}}else{r.skipToEnd();break}}return"comment"}function j(s,r,q){r.context={prev:r.context,indent:s.indentation(),col:s.column(),type:q}}function l(q){q.indent=q.context.indent;q.context=q.context.prev}return{startState:function(){return{tokenize:e,context:null}},token:function(t,s){if(t.sol()){if(s.context&&s.context.align==null){s.context.align=false}}if(t.eatSpace()){return null}var r=s.tokenize(t,s);if(r=="comment"){return r}if(s.context&&s.context.align==null){s.context.align=true}var q=t.current();if(q=="("){j(t,s,")")}else{if(q=="["){j(t,s,"]")}else{if(s.context&&s.context.type==q){l(s)}}}return r},indent:function(t,r){var q=t.context;if(!q){return a.Pass}var s=r.charAt(0)==q.type;if(q.align){return q.col+(s?0:1)}else{return q.indent+(s?0:c.indentUnit)}},blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:n.commentSlashSlash?"//":n.commentHash?"#":null}});(function(){function c(h){var g;while((g=h.next())!=null){if(g=="`"&&!h.eat("`")){return"variable-2"}}h.backUp(h.current().length-1);return h.eatWhile(/\w/)?"variable-2":null}function b(g){if(g.eat("@")){g.match(/^session\./);g.match(/^local\./);g.match(/^global\./)}if(g.eat("'")){g.match(/^.*'/);return"variable-2"}else{if(g.eat('"')){g.match(/^.*"/);return"variable-2"}else{if(g.eat("`")){g.match(/^.*`/);return"variable-2"}else{if(g.match(/^[0-9a-zA-Z$\.\_]+/)){return"variable-2"}}}}return null}function d(g){if(g.eat("N")){return"atom"}return g.match(/^[a-zA-Z.#!?]/)?"variable-2":null}var e="alter and as asc between by count create delete desc distinct drop from having in insert into is join like not on or order select set table union update values where ";function f(k){var h={},j=k.split(" ");for(var g=0;g<j.length;++g){h[j[g]]=true}return h}a.defineMIME("text/x-sql",{name:"sql",keywords:f(e+"begin"),builtin:f("bool boolean bit blob enum long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision real date datetime year unsigned signed decimal numeric"),atoms:f("false true null unknown"),operatorChars:/^[*+\-%<>!=]/,dateSQL:f("date time timestamp"),support:f("ODBCdotTable doubleQuote binaryNumber hexNumber")});a.defineMIME("text/x-mssql",{name:"sql",client:f("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),keywords:f(e+"begin trigger proc view index for add constraint key primary foreign collate clustered nonclustered"),builtin:f("bigint numeric bit smallint decimal smallmoney int tinyint money float real char varchar text nchar nvarchar ntext binary varbinary image cursor timestamp hierarchyid uniqueidentifier sql_variant xml table "),atoms:f("false true null unknown"),operatorChars:/^[*+\-%<>!=]/,dateSQL:f("date datetimeoffset datetime2 smalldatetime datetime time"),hooks:{"@":b}});a.defineMIME("text/x-mysql",{name:"sql",client:f("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),keywords:f(e+"accessible action add after algorithm all analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general get global grant grants group groupby_concat handler hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show signal slave slow smallint snapshot soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),builtin:f("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),atoms:f("false true null unknown"),operatorChars:/^[*+\-%<>!=&|^]/,dateSQL:f("date time timestamp"),support:f("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),hooks:{"@":b,"`":c,"\\":d}});a.defineMIME("text/x-mariadb",{name:"sql",client:f("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),keywords:f(e+"accessible action add after algorithm all always analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general generated get global grant grants group groupby_concat handler hard hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password persistent phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show shutdown signal slave slow smallint snapshot soft soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views virtual warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),builtin:f("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),atoms:f("false true null unknown"),operatorChars:/^[*+\-%<>!=&|^]/,dateSQL:f("date time timestamp"),support:f("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),hooks:{"@":b,"`":c,"\\":d}});a.defineMIME("text/x-cassandra",{name:"sql",client:{},keywords:f("use select from using consistency where limit first reversed first and in insert into values using consistency ttl update set delete truncate begin batch apply create keyspace with columnfamily primary key index on drop alter type add any one quorum all local_quorum each_quorum"),builtin:f("ascii bigint blob boolean counter decimal double float int text timestamp uuid varchar varint"),atoms:f("false true"),operatorChars:/^[<>=]/,dateSQL:{},support:f("commentSlashSlash decimallessFloat"),hooks:{}});a.defineMIME("text/x-plsql",{name:"sql",client:f("appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define describe echo editfile embedded escape exec execute feedback flagger flush heading headsep instance linesize lno loboffset logsource long longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar release repfooter repheader serveroutput shiftinout show showmode size spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout time timing trimout trimspool ttitle underline verify version wrap"),keywords:f("abort accept access add all alter and any array arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body boolean by case cast char char_base check close cluster clusters colauth column comment commit compress connect connected constant constraint crash create current currval cursor data_base database date dba deallocate debugoff debugon decimal declare default definition delay delete desc digits dispose distinct do drop else elseif elsif enable end entry escape exception exception_init exchange exclusive exists exit external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging long loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base object of off offline on online only open option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw read rebuild record ref references refresh release rename replace resource restrict return returning returns reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate session set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work"),builtin:f("abs acos add_months ascii asin atan atan2 average bfile bfilename bigserial bit blob ceil character chartorowid chr clob concat convert cos cosh count dec decode deref dual dump dup_val_on_index empty error exp false float floor found glb greatest hextoraw initcap instr instrb int integer isopen last_day least lenght lenghtb ln lower lpad ltrim lub make_ref max min mlslabel mod months_between natural naturaln nchar nclob new_time next_day nextval nls_charset_decl_len nls_charset_id nls_charset_name nls_initcap nls_lower nls_sort nls_upper nlssort no_data_found notfound null number numeric nvarchar2 nvl others power rawtohex real reftohex round rowcount rowidtochar rowtype rpad rtrim serial sign signtype sin sinh smallint soundex sqlcode sqlerrm sqrt stddev string substr substrb sum sysdate tan tanh to_char text to_date to_label to_multi_byte to_number to_single_byte translate true trunc uid unlogged upper user userenv varchar varchar2 variance varying vsize xml"),operatorChars:/^[*+\-%<>!=~]/,dateSQL:f("date time timestamp"),support:f("doubleQuote nCharCast zerolessFloat binaryNumber hexNumber")});a.defineMIME("text/x-hive",{name:"sql",keywords:f("select alter $elem$ $key$ $value$ add after all analyze and archive as asc before between binary both bucket buckets by cascade case cast change cluster clustered clusterstatus collection column columns comment compute concatenate continue create cross cursor data database databases dbproperties deferred delete delimited desc describe directory disable distinct distribute drop else enable end escaped exclusive exists explain export extended external false fetch fields fileformat first format formatted from full function functions grant group having hold_ddltime idxproperties if import in index indexes inpath inputdriver inputformat insert intersect into is items join keys lateral left like limit lines load local location lock locks mapjoin materialized minus msck no_drop nocompress not of offline on option or order out outer outputdriver outputformat overwrite partition partitioned partitions percent plus preserve procedure purge range rcfile read readonly reads rebuild recordreader recordwriter recover reduce regexp rename repair replace restrict revoke right rlike row schema schemas semi sequencefile serde serdeproperties set shared show show_database sort sorted ssl statistics stored streamtable table tables tablesample tblproperties temporary terminated textfile then tmp to touch transform trigger true unarchive undo union uniquejoin unlock update use using utc utc_tmestamp view when where while with"),builtin:f("bool boolean long timestamp tinyint smallint bigint int float double date datetime unsigned string array struct map uniontype"),atoms:f("false true null unknown"),operatorChars:/^[*+\-%<>!=]/,dateSQL:f("date timestamp"),support:f("ODBCdotTable doubleQuote binaryNumber hexNumber")})}())});