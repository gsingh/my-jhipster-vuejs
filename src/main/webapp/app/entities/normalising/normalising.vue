<template>
    <div>
        <h2 id="page-heading">
            <span id="normalising-heading">Normalisings</span>
            <router-link :to="{name: 'NormalisingCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-normalising">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new Normalising
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <div class="row">
            <div class="col-sm-12">
                <form name="searchForm" class="form-inline" v-on:submit.prevent="search(currentSearch)">
                    <div class="input-group w-100 mt-3">
                        <input type="text" class="form-control" name="currentSearch" id="currentSearch"
                            
                            v-model="currentSearch" />
                        <button type="button" id="launch-search" class="btn btn-primary" v-on:click="search(currentSearch)">
                            <font-awesome-icon icon="search"></font-awesome-icon>
                        </button>
                        <button type="button" id="clear-search" class="btn btn-secondary" v-on:click="clear()"
                            v-if="currentSearch">
                            <font-awesome-icon icon="trash"></font-awesome-icon>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <br/>
        <div class="table-responsive" v-if="normalisings">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('normalisingDate')"><span>Normalising Date</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('shift')"><span>Shift</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('noOfPlates')"><span>No Of Plates</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('normalisedTonnage')"><span>Normalised Tonnage</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('manager.id')"><span>Manager</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="normalising of orderBy(normalisings, propOrder, reverse === true ? 1 : -1)"
                    :key="normalising.id">
                    <td>
                        <router-link :to="{name: 'NormalisingView', params: {normalisingId: normalising.id}}">{{normalising.id}}</router-link>
                    </td>
                    <td>{{normalising.normalisingDate}}</td>
                    <td>{{normalising.shift}}</td>
                    <td>{{normalising.noOfPlates}}</td>
                    <td>{{normalising.normalisedTonnage}}</td>
                    <td>
                        <div v-if="normalising.manager">
                            <router-link :to="{name: 'ShiftManagerView', params: {managerId: normalising.manager.id}}">{{normalising.manager.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'NormalisingView', params: {normalisingId: normalising.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'NormalisingEdit', params: {normalisingId: normalising.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(normalising)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="platemillvuejsApp.normalising.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-normalising-heading" >Are you sure you want to delete this Normalising?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-normalising" v-on:click="removeNormalising()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./normalising.component.ts">
</script>
