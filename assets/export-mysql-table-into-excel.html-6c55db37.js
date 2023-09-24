import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as p,c as o,e as c,a as n,b as s,d as l,f as i}from"./app-cd423d13.js";const u={},r=n("h1",{id:"python-导出-mysql-库表信息到-excel",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#python-导出-mysql-库表信息到-excel","aria-hidden":"true"},"#"),s(" Python 导出 MySQL 库表信息到 Excel")],-1),k=n("h2",{id:"需求",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#需求","aria-hidden":"true"},"#"),s(" 需求")],-1),d=n("p",null,"查询 MySQL 某个库的全部表的元信息，输出成 Excel，每一张表一个 sheet。",-1),m=i(`<h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> mysql<span class="token punctuation">.</span>connector
<span class="token keyword">import</span> xlsxwriter

<span class="token comment"># 根据实际修改下面的变量</span>
host<span class="token operator">=</span><span class="token string">&#39;127.0.0.1&#39;</span>
user<span class="token operator">=</span><span class="token string">&#39;root&#39;</span>
password<span class="token operator">=</span><span class="token string">&#39;password&#39;</span>
database <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>

<span class="token keyword">def</span> <span class="token function">get_title_format</span><span class="token punctuation">(</span>workbook<span class="token punctuation">)</span><span class="token punctuation">:</span>
  title_format <span class="token operator">=</span> workbook<span class="token punctuation">.</span>add_format<span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token string">&#39;bold&#39;</span><span class="token punctuation">:</span> <span class="token boolean">True</span><span class="token punctuation">,</span>
    <span class="token string">&#39;bg_color&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;#B4C7E7&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;align&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;center&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;valign&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;vcenter&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;font_size&#39;</span><span class="token punctuation">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
    <span class="token string">&#39;bottom&#39;</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token string">&#39;right&#39;</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> title_format


<span class="token keyword">def</span> <span class="token function">setup_first_sheet</span><span class="token punctuation">(</span>workbook<span class="token punctuation">,</span> worksheet<span class="token punctuation">)</span><span class="token punctuation">:</span>
  title_format <span class="token operator">=</span> get_title_format<span class="token punctuation">(</span>workbook<span class="token punctuation">)</span>
  <span class="token comment"># 表头</span>
  worksheet<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;A1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;表名&#39;</span><span class="token punctuation">,</span> title_format<span class="token punctuation">)</span>
  worksheet<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;B1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;表备注&#39;</span><span class="token punctuation">,</span> title_format<span class="token punctuation">)</span>

  <span class="token comment"># 设置列宽度</span>
  worksheet<span class="token punctuation">.</span>set_column<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span>

  <span class="token comment"># 设置行高度</span>
  worksheet<span class="token punctuation">.</span>set_row<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">setup_other_sheet</span><span class="token punctuation">(</span>workbook<span class="token punctuation">,</span> worksheet<span class="token punctuation">)</span><span class="token punctuation">:</span>
  title_format <span class="token operator">=</span> get_title_format<span class="token punctuation">(</span>workbook<span class="token punctuation">)</span>
  <span class="token comment"># 表头</span>
  worksheet<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;A1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;字段&#39;</span><span class="token punctuation">,</span> title_format<span class="token punctuation">)</span>
  worksheet<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;B1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;描述&#39;</span><span class="token punctuation">,</span> title_format<span class="token punctuation">)</span>
  worksheet<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;C1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;备注&#39;</span><span class="token punctuation">,</span> title_format<span class="token punctuation">)</span>
  worksheet<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;D1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;字段关联表&#39;</span><span class="token punctuation">,</span> title_format<span class="token punctuation">)</span>

  <span class="token comment"># 设置列宽度</span>
  worksheet<span class="token punctuation">.</span>set_column<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span>
  worksheet<span class="token punctuation">.</span>set_column<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">45</span><span class="token punctuation">)</span>

  <span class="token comment"># 设置行高度</span>
  worksheet<span class="token punctuation">.</span>set_row<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
  workbook <span class="token operator">=</span> xlsxwriter<span class="token punctuation">.</span>Workbook<span class="token punctuation">(</span><span class="token string">&#39;{}.xlsx&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>database<span class="token punctuation">)</span><span class="token punctuation">)</span>

  cnx <span class="token operator">=</span> mysql<span class="token punctuation">.</span>connector<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>user<span class="token operator">=</span>user<span class="token punctuation">,</span> password<span class="token operator">=</span>password<span class="token punctuation">,</span>
                                host<span class="token operator">=</span>host<span class="token punctuation">,</span>
                                database<span class="token operator">=</span>database<span class="token punctuation">)</span>
  <span class="token comment"># https://dev.mysql.com/doc/connector-python/en/connector-python-tutorial-cursorbuffered.html</span>
  cursor_tables <span class="token operator">=</span> cnx<span class="token punctuation">.</span>cursor<span class="token punctuation">(</span>buffered<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
  cursor_columns <span class="token operator">=</span> cnx<span class="token punctuation">.</span>cursor<span class="token punctuation">(</span>buffered<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

  query_tables <span class="token operator">=</span> <span class="token triple-quoted-string string">&#39;&#39;&#39;
  SELECT
  t.TABLE_NAME, t.TABLE_COMMENT
  FROM
  INFORMATION_SCHEMA.TABLES t
  WHERE
  TABLE_SCHEMA = &quot;{}&quot;
  &#39;&#39;&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>database<span class="token punctuation">)</span>

  cursor_tables<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>query_tables<span class="token punctuation">)</span>
  tables <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

  first_sheet <span class="token operator">=</span> workbook<span class="token punctuation">.</span>add_worksheet<span class="token punctuation">(</span><span class="token string">&quot;表信息&quot;</span><span class="token punctuation">)</span>
  setup_first_sheet<span class="token punctuation">(</span>workbook<span class="token punctuation">,</span> first_sheet<span class="token punctuation">)</span>
  row <span class="token operator">=</span> <span class="token number">1</span>
  col <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>table_name<span class="token punctuation">,</span> table_comment<span class="token punctuation">)</span> <span class="token keyword">in</span> cursor_tables<span class="token punctuation">:</span>
    <span class="token comment"># 存储起来，后续还要遍历</span>
    tables<span class="token punctuation">.</span>append<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&#39;table_name&#39;</span><span class="token punctuation">:</span> table_name<span class="token punctuation">,</span> <span class="token string">&#39;table_comment&#39;</span><span class="token punctuation">:</span> table_comment<span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment"># 添加超链接</span>
    first_sheet<span class="token punctuation">.</span>write_url<span class="token punctuation">(</span><span class="token string">&#39;A{}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>row<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&#39;internal:{}!A1&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>table_name<span class="token punctuation">)</span><span class="token punctuation">,</span> string <span class="token operator">=</span> table_name<span class="token punctuation">)</span>
    first_sheet<span class="token punctuation">.</span>write<span class="token punctuation">(</span>row<span class="token punctuation">,</span> col <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> table_comment<span class="token punctuation">)</span>
    row <span class="token operator">+=</span> <span class="token number">1</span>


  <span class="token keyword">for</span> table <span class="token keyword">in</span> tables<span class="token punctuation">:</span>
    query_columns <span class="token operator">=</span> <span class="token triple-quoted-string string">&#39;&#39;&#39;
    SELECT
    COLUMN_NAME, COLUMN_COMMENT 
    FROM
    INFORMATION_SCHEMA.\`COLUMNS\`
    WHERE
    TABLE_SCHEMA = &quot;{}&quot;
    AND TABLE_NAME = &quot;{}&quot;
    &#39;&#39;&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>database<span class="token punctuation">,</span> table<span class="token punctuation">[</span><span class="token string">&#39;table_name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

    cursor_columns<span class="token punctuation">.</span>execute<span class="token punctuation">(</span>query_columns<span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;generating table: {}, {}&quot;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>table<span class="token punctuation">[</span><span class="token string">&#39;table_name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> table<span class="token punctuation">[</span><span class="token string">&#39;table_comment&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    worksheet <span class="token operator">=</span> workbook<span class="token punctuation">.</span>add_worksheet<span class="token punctuation">(</span><span class="token string">&#39;{}&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>table<span class="token punctuation">[</span><span class="token string">&#39;table_name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    setup_other_sheet<span class="token punctuation">(</span>workbook<span class="token punctuation">,</span> worksheet<span class="token punctuation">)</span>

    row <span class="token operator">=</span> <span class="token number">1</span>
    col <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>col_name<span class="token punctuation">,</span> col_comment<span class="token punctuation">)</span> <span class="token keyword">in</span> cursor_columns<span class="token punctuation">:</span>
      worksheet<span class="token punctuation">.</span>write<span class="token punctuation">(</span>row<span class="token punctuation">,</span> col<span class="token punctuation">,</span> col_name<span class="token punctuation">)</span>
      worksheet<span class="token punctuation">.</span>write<span class="token punctuation">(</span>row<span class="token punctuation">,</span> col <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> col_comment<span class="token punctuation">)</span>
      row <span class="token operator">+=</span> <span class="token number">1</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;------&quot;</span><span class="token punctuation">)</span>

  cnx<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
  workbook<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他细节" tabindex="-1"><a class="header-anchor" href="#其他细节" aria-hidden="true">#</a> 其他细节</h2>`,3),v=n("br",null,null,-1),b=n("br",null,null,-1),_=n("br",null,null,-1),h={href:"https://www.rapidtables.com/convert/color/rgb-to-hex.html",target:"_blank",rel:"noopener noreferrer"};function w(g,f){const a=e("ExternalLinkIcon");return p(),o("div",null,[r,k,d,c(" more "),m,n("p",null,[s("上述代码由于库的原因，只能生成新文件或覆盖文件，不能修改原有文件。"),v,s(" 执行代码时必须关闭生成的文件，否则报错。"),b,s(" sheet的名字不能超过 31 个字符。"),_,n("a",h,[s("RBG 转 Hex 工具"),l(a)]),s("，给单元格、文字上颜色时会用到，因为 Excel 显示的是 RBG，但代码里是 Hex。")])])}const E=t(u,[["render",w],["__file","export-mysql-table-into-excel.html.vue"]]);export{E as default};
