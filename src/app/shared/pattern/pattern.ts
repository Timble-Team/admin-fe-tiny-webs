// tslint:disable:max-line-length
export default {
  /*
    https://codepen.io/KUROKUMO/post/japanese-forms-regex-cheatsheet?__cf_chl_jschl_tk__=a8218791799b6558cb127dadb6e327fed26dda15-1576478891-0-AWbDXVOUDdGdeGiwzfMvNCljeZVkGBfAPvTmwdUQpF4_yxZYO-pxJL4X_ZWGeu5s2q32uRYUJQ1twnZBII71HGDD0hlaHeXfvoG6qB-0kuccQwvKi0Y8-2b-GbcGTplMa3Zyvxy5pJ4cokip41adLZDcpSx5NgKVfe4qRhpxNZXt9qjp3PctyhuqczjZiZELE9RQh3jdsMqWxzyFd-vX1AoO6Bv61GbkphE-O_DpENMmLIUeK5DsLCfZ2NX5-bGhCFRJ-QnSQripJ13lQsb_bJjIdbxZptRA0mPMb-m-I6xow8dKN5V9Kuu_MBaWYfUQNgfIkfdiC1uQE01PN3Wx4EtlGr5SXp-5b-h1yNPaCpS3nPAUe9nZOX9uHn29gnGFuw
  */
  email: /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/,
  number: /^-?\d*(\.\d+)?$/,
  domain: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
};
