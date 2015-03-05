chrome.storage.local.get('vkColorChanger', function(result){
    var values = result['vkColorChanger'];
    values = JSON.parse(values);
    var filter = "-webkit-filter:";
    var filterReverse = "-webkit-filter:";
    var additionalParam = "";
    var deg = parseInt(values['hue-deg'])+145;
    var bkgrnd = "";

    if(values['background-image']){
        bkgrnd =
            "body{background-image: url('"+values['background-image']+"');  background-attachment: fixed;background-position-x: 50%;}" +
            "div#wpost_head_wrap,#wrap3{background-color:white;}" +
            "#page_header .right,#page_header .back{border-radius: 0 0 10px 0;}" +

            "#header_wrap2,#wrap3,#side_bar,#page_header," +
            "#fmenu,#chat_onl_wrap," +
            "#stl_left .over #stl_bg{box-shadow: 0 0 7px rgba(0,0,0,0.15);}";
    }

    if (values.gray == "on") {
        deg = 0;
        filter += " grayscale(100%) contrast(120%)";
        filterReverse += " grayscale(100%) contrast(120%)";
    }
    if (values.sepia == "on") {
        deg = 0;
        filter += " sepia(100%) contrast(120%)";
        filterReverse += " sepia(100%) contrast(120%)";
    }
    if(values.invert == "on"){
        filter += " invert(1)";
        //additionalParam += "font-weight:bold !important;";
        filterReverse += " invert(1)";
        if(!values['background-image']){
            additionalParam += "background-color:black;"; // "background:black;";
        }
    }

    filter += " hue-rotate("+deg+"deg)";
    filterReverse += " hue-rotate("+(-deg)+"deg)";

    var data = bkgrnd+

        "#page_layout,#wk_box," +
        //"#owner_photo_edit,#owner_dropbox,#owner_photo_upload," +
        "#fmenu,#stl_bg," +
        "#pad_wrap,.audio_status_tt," + //плеер
        //".popup_box_container .im_stickers_store_wrap,"+
        ".popup_box_container,div.fw_reply_tt,div.own_reply_tt,"+
	"div.docs_panel_wrap,div.cont_login_app_sms_tt,"+
	"div.jpv_cont,div#pageHeader,div#sideBar,div#pageBody,div.notifier_baloon_wrap," +
        //Прикрепление документов
        //".popup_box_container .docs_choose_header,"+
        //".popup_box_container #docs_choose_upload_area_wrap,"+
        //".popup_box_container .docs_choose_rows,"+

        "#mv_box .mv_controls," + //страница с роликом
        "#layer > div.pv_cont > table," + //страница с фото
        "#chat_onl_wrap, .rb_box_wrap," + // чат
        "#box_layer_wrap box_body," + // написать сообщение
        "#custom_menu_wrap," + // кнопка прикрепить
	".widget_body,div#bad_browser," +
	"div.docs_tt_preview,div.like_tt,div.wall_tt.rich,div.mention_tt," +
	"div.profile_map_first" +
	"{"+filter+";}"+

        /*"img.docs_item_thumb_img,img.chat_tab_img,img.fc_contact_photo,img.photo_row_img,td.dialogs_photo,img.im_user_holder,div.im_photo_holder," +
	"img.im_log_author_chat_thumb,img.emoji,img.emoji_css,img.emoji_tab_img,img.fc_msgs_author,img.fc_photo_thumb,img.wl_owner_head_img," +
	"img.photos_choose_album_img,img.docs_choose_photo,img.wall_album_cover,div.page_doc_photo,img.preview,img.page_preview_map,div.page_preview_doc_photo," +
	"img.pva_img,img.pva_photo_img,img#owner_photo_img,img#owner_photo_crop_img,div.tag_frame,div#owner_photo_preview100,div#owner_photo_preview50," +
	"img.leaflet-tile,div.YMaps-tile-container,embed#flash_camera," +
	"canvas#graffiti_cpicker,canvas#graffiti_controls,div#graffiti_aligner," +
	"div.im_stickerpack_preview,img.im_stickerpack_img,a.emoji_sticker_item,img.im_sticker_bl_demo_thumb,img.im_stickers_banner_thumb,img.im_gift," +
	"img.giftImg,div.gift_wrap,div.gift_thumb," +
	"div#page_avatar,img.page_post_thumb_sized_photo,img.page_photo_thumb_big,a.video,img.reply_image,img.feedback_row_photo,div.feedback_photo_icon," +
        "a.ava,a.published_by_photo,a.post_image,div.thumb,a#pv_photo,div.pv_thumb,img#pv_author_img,img.dialogs_inline_author,div.im_photo,a.bp_thumb,img.blst_img," +
	"img.wk_likes_liker_img,img.wdd_img," +
	"img.search_item_img,img.page_media_link_img," +
	"img.fans_fan_img,img.fans_idol_img," +
        "div.page_media_thumbed_link > table > tbody > tr > td.page_media_link_thumb," +
	"div.fave_link_image,img.fave_u_img,img.groups_row_img,img.gle_img,div.feed_friend_image,div.fave_photo_inner,a.fave_video_item," +
	"img.audio_friend_photo,img.friends_photo_img,div.common_friends," +
        ".video_image_div,a.video_row_img,div.video_info_tutorial_screen," +
	"img.apps_featured_img_big,img.apps_featured_img_small,img.apps_recent_img,img.apps_feed_user_img,img.apps_feed_app_img,img.apps_wide_img," +
	"img.settings_bl_photo,td.flist_item_img,img.wddi_img,div#profile_view_as>a.fl_l>img," +
	"a.like_share_widget_icon" +*/

        "img:not(.can_zoom),embed#flash_camera," +
	"canvas#graffiti_cpicker,canvas#graffiti_controls,div#graffiti_aligner," +
	"div.like_share_widget_preview_wrap," +
	"div.fave_photo_inner,div.page_doc_photo,div.im_doc_photo," +
	".video_image_div,div.video_info_tutorial_screen,div.page_video_inline_wrap,span.page_video_thumb," +
	"a.like_share_widget_icon,a.poll_tt_usr,td.page_media_link_thumb,a.page_post_thumb_unsized,a.video_row_img," +
	"div.login_app_device_screen,div.login_mobile_cover," +
	"div#browsers>a," +
	"div#profile_map_cont,.ymaps-2-1-17-svg-icon-content," +
	"div.app_container" +

        "{"+filterReverse+";}" +
        //Хак для пропавших иконок на изображениях
        ".chat_tab_close,.chat_tab_online_icon,.chat_tab_info_wrap,.chat_tab_typing_wrap," + //иконки в чате
	".feedback_photo_icon,div.page_gif_add,a.fave_uph," +
        ".popup_box_container .choose_close_link"+
        "{z-index:1;}" +
	"#pv_photo img { background-image: url(/images/progress_gray.gif) !important; }";

    data +="body{"+additionalParam+"}";

    var css = document.getElementById("VKcolorChanger");
    if(css){
        css.innerHTML = data;
    }else{
        var css = document.createElement("style");
        css.setAttribute("type", "text/css");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("id", "VKcolorChanger");
        css.innerHTML = data;
        document.getElementsByTagName("head")[0].appendChild(css);
    }
});